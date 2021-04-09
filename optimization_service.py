import power_computation.radiator_power_consumption as rad_pow
import datetime
import system as sys


def main():
    sys_output, temp = sys.system_iterate(datetime.datetime(
        2020, 9, 28, 11, 0, 0), 20.0, 15.0, 1.0, sys.PowerConsumptionSystemMode.Mode3, 0.0)

    print(sys_output)
    print(temp)


if __name__ == "__main__":
    main()
