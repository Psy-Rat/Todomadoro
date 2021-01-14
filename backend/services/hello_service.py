from flask import jsonify

def hello(name : str):
    return jsonify({ 'msg': f'hello, {name}'})