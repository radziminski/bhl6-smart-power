import requests
import json

# API DOC: https://openweathermap.org/api/one-call-api


def jprint(obj):
    text = json.dumps(obj, sort_keys=True, indent=4)
    print(text)


def get_weather_parameters():
    parameters = {
        "lat": 52.229676,
        "lon": 21.012229,
        "appid": "fa7600fc40a1fff635b882e00bb122b0",
        "exclude": ["minutely", "daily", "alerts"],
        "units": "metric"
    }

    response = requests.get(
        "http://api.openweathermap.org/data/2.5/onecall", params=parameters)

    hourly_weather = response.json()["hourly"]

    weather_props = [{"time": sample["dt"], "temperature": sample["temp"],
                      "clouds": sample["clouds"]} for sample in hourly_weather]

    return weather_props


if __name__ == "__main__":
    weather_props = get_weather_parameters()

    for elem in weather_props:
        print(elem)
