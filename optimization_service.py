import datetime
import itertools
from typing import List

import power_computation.radiator_power_consumption as rad_pow
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


def main():
    initial_date = datetime.datetime(2020, 1, 1, 0, 0, 0) # o 1h
    initial_curr_temp = 15.0
    initial_outside_temp = 15.0 # z api
    initial_clouding = 1.0 # z api
    initial_accumulator = 0.0

    next_sys_mode = None   # jaki ustawić mode
    min_net_total_power_balance = -float("inf")
    for modes_sequence in build_sequences():
        net_total_power_balance = 0.0

        date = initial_date
        curr_temp = initial_curr_temp
        outside_temp = initial_outside_temp
        clouding = initial_clouding
        accumulator = initial_accumulator

        for mode in modes_sequence:
            sys_out, new_temp = sys.system_iterate(
                date, curr_temp, outside_temp, clouding, mode, accumulator
            )

            date = date + datetime.timedelta(hours=1)
            curr_temp = new_temp
            outside_temp = outside_temp # z api dla nastepnej godziny
            clouding = clouding # z api dla nastepnej godziny
            accumulator = sys_out.accumulator_power

            net_total_power_balance += sys_out.net_power_balance

        if net_total_power_balance > min_net_total_power_balance:
            min_net_total_power_balance = net_total_power_balance
            next_sys_mode = modes_sequence[0]

    print(min_net_total_power_balance)
    print(next_sys_mode)




if __name__ == "__main__":
    main()
