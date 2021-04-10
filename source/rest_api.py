import datetime

import flask
from flask_cors import CORS

import device_mocks as dmocks
import optimization_service as svc
import weather_requests as wapi

app = flask.Flask(__name__)
CORS(app)


@app.route("/plan_next_sequence")
def get_next_sequence_plan() -> None:
    best_modes_seq, alg_run_params = svc.plan_next_sequence()

    merge_info = {
        "best_modes": best_modes_seq,
        "alg_run_params": alg_run_params
    }

    return flask.jsonify(merge_info)


@app.route("/water_level")
def get_water_level() -> None:
    water_mock = dmocks.WaterBank(max_capacity=150)

    level = water_mock.get_water_level(datetime.datetime.now())

    return flask.jsonify({"water_level": level})


@app.route("/accumulator")
def current_accumulator_power() -> None:
    pass


@app.route("/weather_forecast")
def get_weather_forecast() -> None:
    response = wapi.get_weather_parameters()

    return flask.jsonify(response)
