from flask import jsonify
import json

def hello(name : str):
    return jsonify({ 'msg': f'hello, {name}'})

def fakeDataApI():
    path = 'D:\\FILES\Desktop\\todomodoro4\\backend\\services\\data.json'
    data = json.load(open(path))
    return jsonify(data)