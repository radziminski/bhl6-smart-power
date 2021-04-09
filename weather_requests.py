import requests
import json

# API DOC: https://openweathermap.org/api/one-call-api

parameters = {
    "lat": 52.229676,
    "lon": 21.012229,
    "appid": "fa7600fc40a1fff635b882e00bb122b0",
    "exclude": ["minutely", "daily", "alerts"],
    "units": "metric"
}


def jprint(obj):
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)


if __name__ == "__main__":

    API_key = "fa7600fc40a1fff635b882e00bb122b0"

    response = requests.get(
        "http://api.openweathermap.org/data/2.5/onecall", params=parameters)

    print(response.status_code)

    # jprint(response.json()["hourly"])

    # print(response.json()["hourly"][0])
