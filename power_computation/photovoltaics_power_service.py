import datetime
from common.helpers import is_between


def get_value_for_clouding(clouding: float, valueBig: float, valueMedium: float, valueSmall: float):
    if clouding >= 0.9:
        return valueBig
    if clouding >= 0.6:
        return valueMedium
    return valueSmall


def get_photovoltaics_created_power(date_time: datetime.datetime, clouding: float):
    hour = date_time.hour
    month = date_time.month

    if month == 1 or month == 12:
        if hour >= 15 or hour < 8:
            return 0
        if is_between(hour, 10, 14):
            return get_value_for_clouding(clouding, 3, 2, 1.5)
        return get_value_for_clouding(clouding, 1.5, 1, 0.5)

    if month == 2 or month == 3 or month == 10 or month == 11:
        if hour >= 16 or hour < 7:
            return 0
        if is_between(hour, 9, 15):
            return get_value_for_clouding(clouding, 4, 3, 1.5)
        return get_value_for_clouding(clouding, 2, 2, 0.5)

    if month == 4 or month == 5 or month == 9:
        if hour >= 18 or hour < 6:
            return 0
        if is_between(hour, 7, 17):
            return get_value_for_clouding(clouding, 5, 4, 2)
        return get_value_for_clouding(clouding, 3.5, 3, 1)

    if hour >= 20 or hour < 5:
        return 0
    if is_between(hour, 7, 19):
        return get_value_for_clouding(clouding, 5, 4, 2)
    return get_value_for_clouding(clouding, 3.5, 3, 1)
