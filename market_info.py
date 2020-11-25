import pandas as pd

nasdaq_df = pd.read_csv('./static/csv/nasdaq.csv')
amex_df = pd.read_csv('./static/csv/amex.csv')
nyse_df = pd.read_csv('./static/csv/nyse.csv')


def get_tickers(NYSE=True, NASDAQ=True, AMEX=True, sector=""):
    tickers_list = []
    if NYSE:
        tickers_list.extend(parse_tickers(nyse_df.query('Sector == "{}"'.format(sector))['Symbol'].tolist()))
    if NASDAQ:
        tickers_list.extend(parse_tickers(nasdaq_df.query('Sector == "{}"'.format(sector))['Symbol'].tolist()))
    if AMEX:
        tickers_list.extend(parse_tickers(amex_df.query('Sector == "{}"'.format(sector))['Symbol'].tolist()))
    return tickers_list


def parse_tickers(ticker_list):
    return set([t for t in ticker_list if not( '.' in t or '^' in t)])


def get_sector_list():
    sectors = nyse_df['Sector'].tolist()
    good_sectors = []
    for i in range(0, len(sectors)):
        if type(sectors[i]) == str:
            good_sectors.append(sectors[i])
    return list(set(good_sectors))

