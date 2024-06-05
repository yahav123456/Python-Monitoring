import psutil
from flask import Flask, render_template, send_from_directory, jsonify, request, redirect, session
from flask_session import Session
from datetime import datetime, timedelta
import os
import time
import platform

key = os.urandom(8)
app = Flask(__name__, static_folder='static')
app.secret_key = key
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

def get_system_info():
    user_name = os.getlogin()
    system_type = platform.system()
    boot_time = datetime.fromtimestamp(psutil.boot_time())
    return user_name, system_type, boot_time

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username")
        password = request.form.get("password")
        if username == "admin" and password == "admin":
            session["logged_in"] = True
            return redirect("/")
        else:
            error_msg = "Invalid username or password. Please try again."
            return render_template("login.html", error_msg=error_msg)

    if session.get("logged_in"):
        return redirect("/")

    return render_template("login.html")

@app.route('/images/background.jpeg')
def serve_static():
    return send_from_directory('static/images', 'background.jpeg')

@app.route("/logout")
def logout():
    session.pop("logged_in", None)
    return redirect("/login")

@app.route("/data")
def data():
    cpu_usage = psutil.cpu_percent()
    mem_usage = psutil.virtual_memory().percent
    process_count = len(psutil.pids())
    user_name, system_type, boot_time = get_system_info()

    msg = "OK"
    if cpu_usage > 80 or mem_usage > 80:
        msg = "Warning"

    return jsonify(
        cpu_usage=cpu_usage,
        mem_usage=mem_usage,
        process_count=process_count,
        msg=msg,
        user_name=user_name,
        system_type=system_type
    )

@app.route("/")
def index():
    if not session.get("logged_in"):
        return redirect("/login")
    cpu_usage = psutil.cpu_percent()
    mem_usage = psutil.virtual_memory().percent
    process_count = len(psutil.pids())
    user_name, system_type, boot_time = get_system_info()
    return render_template(
        "index.html",
        cpu_usage=cpu_usage,
        mem_usage=mem_usage,
        process_count=process_count,
        msg="OK",
        user_name=user_name,
        system_type=system_type
    )

if __name__ == "__main__":
    app.run(host='0.0.0.0')
