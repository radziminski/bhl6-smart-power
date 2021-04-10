import datetime

work_day = {"0": 0.5, "1": 0.5, "2": 0.5, "3": 0.5,
            "4": 0.5, "5": 3, "6": 3, "7": 3, "8": 2,
            "9": 2, "9": 2, "10": 1, "10": 1, "11": 1,
            "12": 1, "13": 1, "14": 1, "15": 1, "16": 2,
            "17": 2, "18": 2, "19": 2, "20": 1, "21": 1,
            "22": 1, "23": 1}

free_day = {"0": 0.5, "1": 0.5, "2": 0.5, "3": 0.5,
            "4": 0.5, "5": 0.5, "6": 0.5, "7": 0.5, "8": 3,
            "9": 3, "9": 3, "10": 3, "10": 3, "11": 3,
            "12": 1, "13": 1, "14": 1, "15": 1, "16": 1,
            "17": 2, "18": 2, "19": 2, "20": 2, "21": 2,
            "22": 2, "23": 2}


value_table = [work_day, work_day, work_day,
               work_day, work_day, free_day, free_day]


def power_of_other_devices(start_time, end_time):
    time_diff = end_time - start_time

    SECONDS_IN_HOUR = 3600
    time_diff /= SECONDS_IN_HOUR

    retv = 0

    for delta_time in range(time_diff.seconds):
        future_time = datetime.timedelta(hours=delta_time)
        future_time_and_date = start_time + future_time
        retv += value_table[future_time_and_date.weekday()][str(future_time_and_date.hour)]

    return retv
