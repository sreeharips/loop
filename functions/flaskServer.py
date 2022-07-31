from flask import Flask, request

import os
from main import *
import sys
sys.dont_write_bytecode = True

APP = Flask(__name__)

@APP.route("/api/v1/<endpoint>", methods=['GET', 'POST', 'PUT', 'OPTIONS'])
def generic(endpoint):
    print("Calling endpoint " + endpoint)
    return eval(endpoint+"(request)")

if __name__ == '__main__':
    APP.run(debug=True, port=5000)