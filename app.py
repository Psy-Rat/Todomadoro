#!/usr/bin/env python
# -- coding: utf-8 --

import os
import sys

from flask import Flask, url_for, request, redirect, send_from_directory
from backend.views import main_view
from backend.config import ConfigElector
from backend.cli import ArgparseFacade


def flask_init(config_class):
    app = Flask(__name__)
    app.config.from_object(config_class)
    app.register_blueprint(main_view)

    ########
    # Возвращаем статику по руту
    ########
    PATH_STATIC = './static'
    MAIN_PAGE = "index.html"

    @app.route('/<path:path>')
    def sendStatic(path):
        pth = os.path.abspath(os.path.join(app.root_path, PATH_STATIC, path))
        return send_from_directory(os.path.dirname(pth), os.path.basename(pth))

    @app.route('/')
    def index():
        pth = os.path.abspath(os.path.join(app.root_path, PATH_STATIC))
        return send_from_directory(pth, MAIN_PAGE)

    return app


if __name__ == "__main__":
    # Получение инструкций из командной строки
    parser = ArgparseFacade()
    parser.parse()

    # Получаем настройки flask через командную строку
    config_name = parser.get_configuration()
    instruction_obj = ConfigElector.configuration_choice(config_name)

    # Запуск приложения
    app = flask_init(instruction_obj)
    app.run()
