import datetime


def energy_of_other_devices(start_time, end_time):
    time_diff = end_time - start_time

    SECONDS_IN_HOUR = 3600

    time_diff /= SECONDS_IN_HOUR

    # value_table[day of the week]["time_of_day"] = value_of_energy

    value_table = []

    retv = 0

    # value_table[0-4]["0" - "4"] = value for time
    # etc.....
    # freedays[5-6]["0" - "7"] = value for time

    # same day check for time range
    for delta_time in range(time_diff.seconds):
        future_time = datetime.timedelta(hours=start_time.hour + delta_time)
        future_time_and_date = start_time + future_time
        retv += value[future_time_and_date.weekday()
                      ][str(future_time_and_date.hour)]

    return retv
