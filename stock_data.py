'''
    Functions to fetch stock price data for a variety of date ranges.
    Author: Oscar Jaimes
    Date: November 22, 2020
'''
import yfinance as yf

def get_5day_history(ticker):
    current_stock = yf.Ticker(ticker)
    return current_stock.history(period='5d')
