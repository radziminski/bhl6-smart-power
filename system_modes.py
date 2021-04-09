import datetime
from dataclasses import dataclass
from enum import IntEnum

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
class SystemOutput:
    used_power: float
    out_temp: float


def call_system(
    date: datetime.datetime,
    sys_mode: PowerConsumptionSystemMode,
    curr_temp: float,
    outside_temp: float,
    clouding: float,
) -> SystemOutput:
    water_power = water_svc.get_water_power(date)
    photovolt_power = photovolt_svc.get_photovoltaics_created_power(date, clouding)

    temps = radiator_svc.Temperatures(
        curr_temp=curr_temp,
        desired_temp=radiator_svc.determine_desired_temperature(date),
        outside_temp=outside_temp,
    )
    temps_power_control = radiator_svc.temp2temp_control(curr_temp)
    radiator_power = radiator_svc.compute_radiator_usage_result(
        temps, temps_power_control, 10.0
    )

    other_dev_power = other_svc.power_of_other_devices(date, date + OPTIMIZED_TIME_PERIOD)


call_system(datetime.datetime.now(), PowerConsumptionSystemMode.Mode1, 14.0, 10.0, 0.3)
