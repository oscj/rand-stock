'''
    Get stock info here
'''
import yfinance as yf

def get_info(ticker):
    stock_info = yf.Ticker(ticker).info
    info_dict = {
        'open': stock_info['open'],
        'high': stock_info['dayHigh'],
        'low': stock_info['dayLow'],
        'marketCap': stock_info['marketCap'],
        'vol': stock_info['regularMarketVolume'],
        'avgVol': stock_info['averageVolume'],
        '52wHigh' : stock_info['fiftyTwoWeekHigh'],
        '52wLow' : stock_info['fiftyTwoWeekLow']
        }
    return info_dict;

