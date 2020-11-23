'''
    Functions to fetch stock price data for a variety of date ranges.
    Author: Oscar Jaimes
    Date: November 22, 2020
'''
import yfinance as yf
import time
import json

def get_5day_history(ticker):
    current_stock = yf.Ticker(ticker)
    five_day_hist = current_stock.history(period='5d')
    return parse_historic_data(five_day_hist['Open'], five_day_hist['Close'])


def parse_historic_data(open_data, close_data):
    '''
        Parses historic data to return a dictionary of dates with opening and closing prices for each date.
    '''
    open_history = json.loads(open_data.to_json())
    close_history = json.loads(close_data.to_json())

    # UTC time since epoch list
    utc_date_list = [val for val in open_history]

    # convert UTC time since epoch to local time
    local_date_list = [time.ctime(int(val)) for val in utc_date_list]

    final_dict = dict()
    for i in range(len(open_history)):
        final_dict[local_date_list[i]] = {
            'open': open_history[utc_date_list[i]], 'close': close_history[utc_date_list[i]]}

    return (final_dict)
