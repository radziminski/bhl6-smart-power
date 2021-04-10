#!/bin/bash

gunicorn -w 1 -b 0.0.0.0:1234 --log-level ERROR rest_api:app
