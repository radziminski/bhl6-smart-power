import datetime


def is_hour_for_water_heating(date_time: datetime.datetime):
    initial_date = datetime.datetime(2020, 1, 1, 0, 0, 0, 0)
    date_difference = initial_date - date_time
    return abs(date_difference.total_seconds() / (60 * 60)) % 20 == 0


def get_water_power(date_time: datetime.datetime):
    if is_hour_for_water_heating(date_time):
        return 6.0
    return 0.0
