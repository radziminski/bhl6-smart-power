import datetime
import itertools
from typing import List, Tuple

import power_computation.radiator_power_consumption as rad_pow
import weather_requests as wapi
import power_system as sys
import energy_cost_computation as ec

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
        return 9.0


def plan_next_sequence():
    response = wapi.get_weather_parameters()
    temp_sensor = TemperatureSensor()

    initial_date = datetime.datetime(2020, 12, 1, 12, 0, 0) # o 1h
    initial_curr_temp = 23.0
    initial_outside_temp = temp_sensor.get_temperature()
    initial_clouding =  1 - (response[0]["clouds"] / 100.0) # z api
    initial_accumulator = 0.0

    best_sequence = None   # jaki ustawić mode
    best_run_params = None
    min_net_total_cost = float("inf")
    for modes_sequence in build_sequences():
        net_total_power_cost = 0.0

        date = initial_date
        curr_temp = initial_curr_temp
        accumulator = initial_accumulator

        algorithm_run = []
        for index, mode in enumerate(modes_sequence):
            outside_temp = response[index]["temperature"] if index != 0 else initial_outside_temp
            clouding = 1 - (response[index]["clouds"] / 100.0)

            if index == 0:
                algorithm_run.append({
                    "outside_temp": outside_temp,
                    "curr_temp": curr_temp,
                    "clouding": clouding,
                    "accumulator": accumulator,
                    "net_cost": 0.0,
                    "net_power_used": 0.0
                })

            sys_out, new_temp = sys.system_iterate(
                date, curr_temp, outside_temp, clouding, mode, accumulator
            )

            net_power_cost = ec.get_energy_cost(date, sys_out.net_power_balance, mode)
            net_total_power_cost += net_power_cost

            date = date + datetime.timedelta(hours=1)
            curr_temp = new_temp
            accumulator = sys_out.accumulator_power

            algorithm_run.append({
                "outside_temp": response[index+1]["temperature"],
                "curr_temp": curr_temp,
                "clouding": clouding,
                "accumulator": accumulator,
                "net_cost": net_power_cost,
                "net_power_used": sys_out.net_power_balance
            })

        if net_total_power_cost < min_net_total_cost:
            min_net_total_cost = net_total_power_cost
            best_sequence = modes_sequence
            best_run_params = algorithm_run

    return best_sequence, algorithm_run


def main():
    sys_mode, run = plan_next_sequence()
    print(sys_mode)
    print(run)


if __name__ == "__main__":
    main()