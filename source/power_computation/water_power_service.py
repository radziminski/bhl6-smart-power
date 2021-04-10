import datetime


def is_hour_for_water_heating(date_time: datetime.datetime):
    initial_date = datetime.datetime(2020, 1, 1, 0, 0, 0, 0)
    date_difference = initial_date - date_time

    return int(abs(date_difference.total_seconds() / (60 * 60))) % 20 == 0


def last_full_capacity_hour_with_respect(date: datetime.datetime):
    counter = 0
    while True:
        if is_hour_for_water_heating(date):
            return counter

        counter += 1
        date = date - datetime.timedelta(hours=1)


def get_water_power(date_time: datetime.datetime):
    if is_hour_for_water_heating(date_time):
        return 6.0
    return 0.0
