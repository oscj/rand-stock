'''
server.py
---------
Randstock API

Author: Oscar Jaimes
Last updated: June 20 2021
'''
import generator
import market_info as mi
import stock_data as sd
import fetch_news as fn

import flask
from flask import Flask, render_template, request, json
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='./build', static_url_path='/')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

limiter = Limiter(
    app,
    key_func=get_remote_address,
    default_limits=["12 per minute"]
)


@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route("/valid-markets")
def get_valid_markets():
    return {'markets': ['NYSE', 'NASDAQ', 'AMEX', 'ASX']}


@app.route('/rand-nyse')
def get_rand_nyse():
    sector = request.args.get("sector", default='Technology')
    return generator.get_rand_ticker_nyse(sector)


@app.route('/rand-nasdaq')
def get_rand_nasdaq():
    sector = request.args.get("sector", default='Technology')
    print('This is sector: {}'.format(sector))
    return generator.get_rand_ticker_nasdaq(sector)


@app.route('/rand-amex')
def get_rand_amex():
    sector = request.args.get("sector", default='Technology')
    return generator.get_rand_ticker_amex(sector)


@app.route('/rand-asx')
def get_rand_asx():
    sector = request.args.get("sector", default='Technology')
    return generator.get_rand_ticker_asx(sector)


@app.route('/sector-list')
def get_sector_list():
    sector_list = mi.get_sector_list()
    sector_dict = {'sectors': []}
    for sector in sector_list:
        sector_dict['sectors'].append(sector)
    return sector_dict


@app.route('/stock-info')
def get_stock_info():
    stock = request.args.get('ticker')
    return sd.get_info(stock)


@app.route('/stock-news')
@limiter.exempt
def get_stock_news():
    stock = request.args.get('ticker')
    return fn.get_news_by_ticker(stock)


@app.errorhandler(429)
def ratelimit_handler(e):
    return flask.make_response(json.jsonify(error="You have exceeded the rate limit"), 429)


@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r


if __name__ == '__main__':
    app.run()
