#!/usr/bin/env python
# -- coding: utf-8 --

import os
from flask import Flask, url_for, request, redirect, send_from_directory
from backend.views import main_view


app = Flask(__name__)
app.register_blueprint(main_view)

########
# Возвращаем статику по руту
########
PATH_STATIC = './static'
@app.route('/<path:path>')
def sendStatic(path):
    pth = os.path.abspath(os.path.join(app.root_path, PATH_STATIC, path))
    return send_from_directory(os.path.dirname(pth), os.path.basename(pth))


@app.route('/')
def index():
    return redirect('index.html')


if __name__ == "__main__":
    app.run()