from flask import Blueprint, jsonify
from .services import hello


main_view = Blueprint('main_view', __name__)

@main_view.route('/api/hello/<path:name>')
def helloRoute(name : str):
    return hello(name)
