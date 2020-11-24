import generator
import market_info as mi
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



if __name__ == '__main__':
    app.run()

