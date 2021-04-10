import flask
import optimization_service as svc

app = flask.Flask(__name__)

@app.route("/plan_next_sequence")
def sys_plan_next_sequence() -> None:
    best_modes_seq, alg_run_params = svc.plan_next_sequence()

    merge_info = {
        "best_modes": best_modes_seq,
        "alg_run_params": alg_run_params
    }

    return flask.jsonify(merge_info)
