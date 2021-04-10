import datetime
from dataclasses import dataclass

import system as sys


@dataclass
class CostDetermingProps:
    month: int
    is_weekday: bool
    hour: int


COST_TABLE_FOR_OCT_MAR = {
    False: { #not weekday
        "outcome": [1.0, 2.0, 1.0, 2.0, 1.0],
        "income": [0.5, 2.5, 1.0, 2.5, 0.5]
    },
    True: { # weekday
        "outcome": 1.0,
        "income": 0.5
    }
}

COST_TABLE_FOR_APR_SEP = {
    False: { #not weekday
        "outcome": [1.0, 2.0, 1.0, 2.0, 1.0],
        "income": [0.5, 2.5, 1.0, 2.5, 0.5]
    },
    True: { #weekday
        "outcome": [1, 0.5, 1.0],
        "income": [0.5, 0.25, 0.5]
    }
}


def extract_cost_determing_props(date: datetime.datetime) -> CostDetermingProps:
    return CostDetermingProps(date.month, date.weekday(), date.hour)

def determine_cost_value_index_oct_mar(hour: int) -> float:
    if 0 <= hour < 6:
        return 0
    elif 6 <= hour < 13:
        return 1
    elif 13 <= hour < 15:
        return 2
    elif 15 <= hour < 22:
        return 3
    elif 22 <= hour < 24:
        return 4

def determine_cost_value_index_apr_sep_weekday(hour: int) -> float:
    if 0 <= hour < 12:
        return 0
    elif 12 <= hour < 15:
        return 1
    elif 15 <= hour < 24:
        return 2

def determine_cost_value_index_apr_sep_non_weekday(hour: int) -> float:
    if 0 <= hour < 6:
        return 0
    elif 6 <= hour < 15:
        return 1
    elif 15 <= hour < 17:
        return 2
    elif 17 <= hour < 22:
        return 3
    elif 22 <= hour < 24:
        return 4

def get_energy_cost(date: datetime.datetime, amount_energy: float, sys_mode: sys.PowerConsumptionSystemMode) -> float:
    if sys_mode != sys.PowerConsumptionSystemMode.Mode2 and amount_energy > 0.0:
        return 0.0

    props = extract_cost_determing_props(date)
    amount_energy = -amount_energy

    if props.month <= 3 or props.month >= 10:
        if props.is_weekday:
            cost = amount_energy * COST_TABLE_FOR_OCT_MAR[True]["income"] if amount_energy > 0.0 else amount_energy * COST_TABLE_FOR_OCT_MAR[True]["outcome"]
            return cost
        else:
            index = determine_cost_value_index_oct_mar(props.hour)
            cost = amount_energy * COST_TABLE_FOR_OCT_MAR[False]["income"][index] if amount_energy > 0.0 else amount_energy * COST_TABLE_FOR_OCT_MAR[True]["outcome"][index]
            return cost
    else:
        if props.is_weekday:
            index = determine_cost_value_index_apr_sep_weekday(props.hour)
            cost = amount_energy * COST_TABLE_FOR_APR_SEP[True]["income"][index] if amount_energy > 0.0 else amount_energy * COST_TABLE_FOR_APR_SEP[True]["outcome"][index]
            return cost
        else:
            index = determine_cost_value_index_apr_sep_non_weekday(props.hour)
            cost = amount_energy * COST_TABLE_FOR_APR_SEP[False]["income"][index] if amount_energy > 0.0 else amount_energy * COST_TABLE_FOR_APR_SEP[True]["outcome"][index]
            return cost
