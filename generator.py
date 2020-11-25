'''
    Generate random stocks here
'''
import market_info as mi
from random import randint


def get_rand_ticker_nasdaq(sector):
    nasdaq_tickers = mi.get_tickers(NYSE=False, NASDAQ=True, AMEX=False, sector=sector)
    return nasdaq_tickers[randint(0, len(nasdaq_tickers) - 1)]

def get_rand_ticker_nyse(sector):
    nyse_tickers = mi.get_tickers(NYSE=True, NASDAQ=False, AMEX=False, sector=sector)
    return nyse_tickers[randint(0, len(nyse_tickers) - 1)]

def get_rand_ticker_amex(sector):
    amex_tickers = mi.get_tickers(NYSE=False, NASDAQ=False, AMEX=True, sector=sector)
    return amex_tickers[randint(0, len(amex_tickers) - 1)]