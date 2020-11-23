from get_all_tickers import get_tickers as gt
from get_all_tickers.get_tickers import Region
from random import randint


def get_rand_ticker_nasdaq():
    nasdaq_tickers = gt.get_tickers(NYSE=False, NASDAQ=True, AMEX=False)
    return nasdaq_tickers[randint(0, len(nasdaq_tickers) - 1)]

def get_rand_ticker_nyse():
    nyse_tickers = gt.get_tickers(NYSE=True, NASDAQ=False, AMEX=False)
    return nyse_tickers[randint(0, len(nyse_tickers) - 1)]

def get_rand_ticker_amex():
    amex_tickers = gt.get_tickers(NYSE=False, NASDAQ=False, AMEX=True)
    return amex_tickers[randint(0, len(amex_tickers) - 1)]