from flask import jsonify
import json
import os

# BACKEND_SERVICES = "\\backend\\services"

def hello(name : str):
    return jsonify({ 'msg': f'hello, {name}'})

def fakeDataApI():
    __wdir__ = os.path.dirname(os.path.realpath(__file__))
    path = os.path.join(__wdir__, "data.json")
    data = json.load(open(path))
    return jsonify(data)