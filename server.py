import generator 
import stock_data as sd

from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/rand-nyse')
def get_rand_nyse():
    return generator.get_rand_ticker_nyse()

@app.route('/rand-nasdaq')
def get_rand_nasdaq():
    return generator.get_rand_ticker_nasdaq()

@app.route('/rand-amex')
def get_rand_amex():
    return generator.get_rand_ticker_amex()

@app.route('/stock5d')
def get_stock_data_5d():
    ticker = (request.args.get('ticker'))
    return sd.get_5day_history(ticker).to_json()

if __name__ == '__main__':
    app.run()