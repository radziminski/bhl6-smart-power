import datetime
from dataclasses import dataclass
from typing import Tuple


@dataclass
class Temperatures:
    curr_temp: float
    desired_temp: float
    outside_temp: float


@dataclass
class TemperaturePowerControl:
    sustain: int
    increase_by_1: float
    hours_to_decrease_by_1: float


@dataclass
class RadiatorPowerUsage:
    used_power: int
    output_temperature: float


def determine_desired_temperature(date: datetime.datetime) -> float:
    hour = date.hour

    if date.weekday():
        return 20 if hour < 5 else 23
    else:
        return 20 if hour < 8 else 23


def compute_radiator_usage_result(
    temps: Temperatures, temps_power_control: TemperaturePowerControl
) -> RadiatorPowerUsage:
    if temps.curr_temp == temps.desired_temp:  # sustain temperature
        return RadiatorPowerUsage(temps_power_control.sustain, temps.curr_temp)

    elif temps.curr_temp < temps.desired_temp:  # increase temperature
        temp_diff = abs(temps.curr_temp - temps.desired_temp)
        power_needed = temps_power_control.increase_by_1 * temp_diff

        return RadiatorPowerUsage(power_needed, temps.desired_temp)
    else:  # decrease temperature
        return RadiatorPowerUsage(
            0,
            temps.curr_temp
            - temps.curr_temp / (temps_power_control.hours_to_decrease_by_1 + 3e-5),
        )


def temp2temp_control(curr_temp: float) -> TemperaturePowerControl:
    @dataclass(unsafe_hash=True)
    class Range:
        upper_limit: int
        lower_limit: int

    temp2temp_control = {
        Range(float("inf"), 20): TemperaturePowerControl(0, 0, 0),
        Range(20, 15): TemperaturePowerControl(0.5, 2, 6),
        Range(15, 5): TemperaturePowerControl(1, 4, 4),
        Range(5, 0): TemperaturePowerControl(2, 5, 6),
        Range(0, -5): TemperaturePowerControl(3, 6, 2),
        Range(-5, -10): TemperaturePowerControl(5, 7, 1),
        Range(-10, -20): TemperaturePowerControl(7, 10, 0.5),
        Range(-20, -float("inf")): TemperaturePowerControl(9, 12, 0.25),
    }

    for key, value in temp2temp_control.items():
        if key.lower_limit < curr_temp <= key.upper_limit:
            return value
