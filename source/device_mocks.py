import datetime
from dataclasses import dataclass
import datetime
import random


import power_computation.water_power_service as water_svc


class WaterBank:
    def __init__(self, max_capacity: int):
        self.max_capacity = max_capacity

    def get_water_level(self, date: datetime.datetime) -> float:
        if water_svc.is_hour_for_water_heating(date):
            ret_value = date.minute / 60 * self.max_capacity
            return ret_value

        working_hours = water_svc.last_full_capacity_hour_with_respect(date)
        ret_value = self.max_capacity - working_hours / 20 * self.max_capacity

        return ret_value


@dataclass
class Accumulator:
    power: float


class InsideThermometer():
    def __init__(self, initial_temperature):
        self.inside_temperature = initial_temperature

    def set_temperature(self, current_temperature: float) -> None:
        self.inside_temperature = current_temperature

    def get_current_temperature(self) -> float:
        return self.inside_temperature


class OutsideThermometer:
    def __init__(self, date: datetime.datetime):
        self.outside_temp = 0
        self.date_month = date.month
        self.temperatures_table = [-1.8, -0.6, 2.8, 8.7,
                                   14.2, 17.0, 19.2, 18.3, 13.5, 8.5, 3.3, -0.7]
        self.outside_temp = self.temperatures_table[self.date_month - 1]

    def get_current_temperature(self) -> float:
        chance = random.uniform(-1, 1)
        self.outside_temp = self.outside_temp + chance * 0.5
        return self.outside_temp


class LightSensor:
    def __init__(self):
        self.lightness = 15

    def get_lightness(self) -> int:
        chance = random.uniform(-5, 5)

        self.lightness += chance * 10

        self.lightness = max(self.lightness, 0)

        return self.lightness
