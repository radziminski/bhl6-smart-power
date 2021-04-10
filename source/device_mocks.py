import datetime
from dataclasses import dataclass

from power_computation.water_power_service import is_hour_for_water_heating


class WaterBank:
    def __init__(self, max_capacity: int):
        self.max_capacity = max_capacity

    def get_water_level(self, date: datetime.datetime) -> float:
        if not is_hour_for_water_heating(date):
            return self.max_capacity

        mocked_level_drop = date.minute / 60 * self.max_capacity

        return self.max_capacity - mocked_level_drop


@dataclass
class Accumulator:
    power: float
