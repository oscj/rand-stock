'''
    Server side. Controls routes. Provides access to stock & related data

    Oscar Jaimes
    Nov 24 2020
'''
import generator
import market_info as mi
import stock_data as sd
import fetch_news as fn

import flask
from flask import Flask, render_template, request, json
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["12 per minute"]
)

@app.errorhandler(429)
def ratelimit_handler(e):
    return flask.make_response(json.jsonify(error="You have exceeded the rate limit"), 429)

@app.route('/')
@limiter.exempt
def main():
    response = flask.Response()
    response.headers["Clear-Site-Data"] = "cache"
    return render_template('main.html')

@app.route('/rand-nyse')
def get_rand_nyse():
    sector = request.args.get("sector", default='Technology')
    return generator.get_rand_ticker_nyse(sector)

@app.route('/rand-nasdaq')
def get_rand_nasdaq():
    sector = request.args.get("sector", default='Technology')
    return generator.get_rand_ticker_nasdaq(sector)

@app.route('/rand-amex')
def get_rand_amex():
    sector = request.args.get("sector", default='Technology')
    return generator.get_rand_ticker_amex(sector)

@app.route('/sector-list')
def get_sector_list():
    sector_list =  mi.get_sector_list()
    sector_dict = { 'sectors' : []}
    for sector in sector_list:
        sector_dict['sectors'].append(sector)
    return sector_dict
        
@app.route('/stock-info')
def get_stock_info():
    stock = request.args.get('ticker')
    return sd.get_info(stock)

@app.route('/stock-news')
def get_stock_news():
    stock = request.args.get('ticker')
    return fn.get_news_by_ticker(stock)

if __name__ == '__main__':
    app.run()