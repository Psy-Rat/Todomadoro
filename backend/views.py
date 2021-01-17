from flask import Blueprint, jsonify
from .services import hello, fakeDataApI


main_view = Blueprint('main_view', __name__)

@main_view.route('/api/hello/<path:name>')
def helloRoute(name : str):
    return hello(name)

@main_view.route('/api/fake/<path:userId>')
def fateDataRoute(userId : str):
    return fakeDataApI()
