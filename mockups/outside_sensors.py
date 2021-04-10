import datetime
import random


class OutsideThermometer:
    def __init__(self, date: datetime.datetime):
        self.outside_temp = 0
        self.date_month = date.month
        self.temperatures_table = [-1.8, -0.6, 2.8, 8.7,
                                   14.2, 17.0, 19.2, 18.3, 13.5, 8.5, 3.3, -0.7]
        self.outside_temp = self.temperatures_table[self.date_month - 1]

    def get_current_temperature(self) -> float:
        chance = random.uniform(-1, 1)
        self.outside_temp = self.outside_temp + chance * 2
        return self.outside_temp


class LightSensor:
    def __init__(self):
        self.lightness = 15

    def get_lightness(self) -> int:
        chance = random.uniform(-5, 5)

        self.lightness += chance * 10

        self.lightness = max(self.lightness, 0)

        return self.lightness


if __name__ == "__main__":
    # thermometer = OutsideThermometer(datetime.datetime.now())
    # print(thermometer.get_current_temperature())
    # print(thermometer.get_current_temperature())
    # print(thermometer.get_current_temperature())
    # print(thermometer.get_current_temperature())
    # print(thermometer.get_current_temperature())
    # print(thermometer.get_current_temperature())
    # light = LightSensor()
    # print(light.get_lightness())
    # print(light.get_lightness())
    # print(light.get_lightness())
    # print(light.get_lightness())
    # print(light.get_lightness())
