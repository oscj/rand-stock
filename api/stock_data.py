'''
    Get stock info here based on ticker symbol.

    Oscar Jaimes
    Nov 24 2020
'''
import yfinance as yf

def get_info(ticker):
    try:
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
    except Exception as e:
        info_dict = {
            'open': '-',
            'high': '-',
            'low': '-',
            'marketCap': '-',
            'vol': '-',
            'avgVol': '-',
            '52wHigh' : '-',
            '52wLow' : '-'
        }
        return info_dict;

