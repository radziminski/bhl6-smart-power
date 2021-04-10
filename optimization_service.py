import datetime
import itertools
from typing import List, Tuple

import power_computation.radiator_power_consumption as rad_pow
import weather_requests as wapi
import system as sys

SERIES_LENGTH = 5


def build_sequences(
    series_length: int = SERIES_LENGTH,
) -> List[List[sys.PowerConsumptionSystemMode]]:
    modes = [
        sys.PowerConsumptionSystemMode.Mode1,
        sys.PowerConsumptionSystemMode.Mode2,
        sys.PowerConsumptionSystemMode.Mode3,
        sys.PowerConsumptionSystemMode.Mode4,
    ]

    return [seq for seq in itertools.product(modes, repeat=SERIES_LENGTH)]


class TemperatureSensor:
    def get_temperature(self):
        return 0.0


def get_next_system_state() -> sys.PowerConsumptionSystemMode:
    response = wapi.get_weather_parameters()
    temp_sensor = TemperatureSensor()

    initial_date = datetime.datetime(2020, 12, 1, 12, 0, 0) # o 1h
    initial_curr_temp = 23.0
    initial_outside_temp = temp_sensor.get_temperature()
    initial_clouding =  1 - (response[0]["clouds"] / 100.0) # z api
    initial_accumulator = 7.0

    next_sys_mode = None   # jaki ustawić mode
    min_net_total_power_balance = -float("inf")
    for modes_sequence in build_sequences():
        net_total_power_balance = 0.0

        date = initial_date
        curr_temp = initial_curr_temp
        accumulator = initial_accumulator

        for index, mode in enumerate(modes_sequence):
            outside_temp = response[index]["temperature"] if index != 0 else initial_outside_temp
            clouding = 1 - (response[index]["clouds"] / 100.0)

            sys_out, new_temp = sys.system_iterate(
                date, curr_temp, outside_temp, clouding, mode, accumulator
            )

            date = date + datetime.timedelta(hours=1)
            curr_temp = new_temp
            accumulator = sys_out.accumulator_power

            net_total_power_balance += sys_out.net_power_balance

        if net_total_power_balance > min_net_total_power_balance:
            min_net_total_power_balance = net_total_power_balance
            next_sys_mode = modes_sequence[0]

    return next_sys_mode


def main():
    sys_mode = get_next_system_state()
    print(sys_mode)


if __name__ == "__main__":
    main()
