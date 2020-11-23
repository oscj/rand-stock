import generator 
from flask import Flask
app = Flask(__name__)

@app.route('/')
def main():
    return 'Hello, world'

@app.route('rand-nyse')
def get_rand_nyse():
    return generator.get_rand_ticker_nyse()

@app.route('rand-nasdaq')
def get_rand_nasdaq():
    return generator.get_rand_ticker_nasdaq()

@app.route('rand-amex')
def get_rand_amex():
    return generator.get_rand_ticker_amex()