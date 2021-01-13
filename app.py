import os
from flask import Flask, render_template, url_for, request, redirect, send_from_directory


app = Flask(__name__)

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
    return redirect('index')


if __name__ == "__main__":
    app.run()
