import datetime
from dataclasses import dataclass
from enum import IntEnum
from typing import Tuple

import power_computation.other_devices_power_consumption as other_svc
import power_computation.photovoltaics_power_service as photovolt_svc
import power_computation.radiator_power_consumption as radiator_svc
import power_computation.water_power_service as water_svc

OPTIMIZED_TIME_PERIOD = datetime.timedelta(hours=1)  # 1h


class PowerConsumptionSystemMode(IntEnum):
    Mode1 = 1  # main source: photovoltaics, under: net, over: accumulator
    Mode2 = 2  # main source: photovoltaics, under: net, over: net
    Mode3 = 3  # main source: photovoltaics, under: net, over: out (net->accumulator)
    Mode4 = 4  # main source: photovoltaics & accumulator, under: net, over: out


@dataclass
class PowerOutput:
    power_balance: float
    out_temp: float


def compute_power_balance(
    date: datetime.datetime,
    curr_temp: float,
    outside_temp: float,
    clouding: float,
) -> PowerOutput:
    water_power = water_svc.get_water_power(date)
    photovolt_power = photovolt_svc.get_photovoltaics_created_power(
        date, clouding)

    temps = radiator_svc.Temperatures(
        curr_temp=curr_temp,
        desired_temp=radiator_svc.determine_desired_temperature(date),
        outside_temp=outside_temp,
    )
    temps_power_control = radiator_svc.outside_temp2temp_control(outside_temp)
    radiator_power = radiator_svc.compute_radiator_usage_result(
        temps, temps_power_control, 10.0 - water_power
    )

    other_dev_power = other_svc.power_of_other_devices(
        date, date + OPTIMIZED_TIME_PERIOD
    )

    total_power_balance = (
        photovolt_power - water_power - radiator_power.used_power - other_dev_power
    )
    return PowerOutput(total_power_balance, radiator_power.output_temperature)


@dataclass
class SystemInput:
    power_output: PowerOutput
    sys_mode: PowerConsumptionSystemMode
    accumulator_power: float


@dataclass
class SystemOutput:
    net_power_balance: float  # positive we add power, negative we take power
    accumulator_power: float


def process_system(sys_input: SystemInput) -> SystemOutput:
    if sys_input.power_output.power_balance >= 0.0:
        if sys_input.sys_mode in [
            PowerConsumptionSystemMode.Mode3,
            PowerConsumptionSystemMode.Mode4,
        ]:
            return SystemOutput(0.0, sys_input.accumulator_power)
        elif sys_input.sys_mode == PowerConsumptionSystemMode.Mode1:
            acc_power_gain = max(1, sys_input.power_output.power_balance)

            return SystemOutput(
                0.0, min(10.0, sys_input.accumulator_power + acc_power_gain)
            )
        else:
            return SystemOutput(
                sys_input.power_output.power_balance, sys_input.accumulator_power
            )
    else:
        if sys_input.sys_mode == PowerConsumptionSystemMode.Mode4:
            new_accumulator_power_diff = (
                sys_input.accumulator_power + sys_input.power_output.power_balance
            )

            if new_accumulator_power_diff > 0:
                return SystemOutput(0.0, new_accumulator_power_diff)
            else:
                return SystemOutput(new_accumulator_power_diff, 0.0)

        return SystemOutput(
            sys_input.power_output.power_balance, sys_input.accumulator_power
        )


def system_iterate(
    date: datetime.datetime,
    curr_temp: float,
    outside_temp: float,
    clouding: float,
    sys_mode: PowerConsumptionSystemMode,
    accumulator_power: float
) -> Tuple[SystemOutput, float]:

    power_output = compute_power_balance(
        date, curr_temp, outside_temp, clouding)
    sys_input = SystemInput(power_output, sys_mode, accumulator_power)
    sys_output = process_system(sys_input)

    return (sys_output, power_output.out_temp)
