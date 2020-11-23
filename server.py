import generator 
from flask import Flask, render_template
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

if __name__ == '__main__':
    app.run()