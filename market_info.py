import pandas as pd
import requests
import io

nasdaq_df = pd.read_csv('./static/csv/nasdaq.csv')
amex_df = pd.read_csv('./static/csv/amex.csv')
nyse_df = pd.read_csv('./static/csv/nyse.csv')


def get_tickers(NYSE=True, NASDAQ=True, AMEX=True, sector=""):
    tickers_list = []
    if NYSE:
        tickers_list.extend(parse_tickers(nyse_df.query(
            'Sector == "{}"'.format(sector))['Symbol'].tolist()))
    if NASDAQ:
        tickers_list.extend(parse_tickers(nasdaq_df.query(
            'Sector == "{}"'.format(sector))['Symbol'].tolist()))
    if AMEX:
        tickers_list.extend(parse_tickers(amex_df.query(
            'Sector == "{}"'.format(sector))['Symbol'].tolist()))
    return tickers_list


def parse_tickers(ticker_list):
    return set([t for t in ticker_list if not('.' in t or '^' in t)])


def get_sector_list():
    sectors = nyse_df['Sector'].tolist()
    good_sectors = []
    for i in range(0, len(sectors)):
        if type(sectors[i]) == str:
            good_sectors.append(sectors[i])
    return list(set(good_sectors))


'''
TODO 
- implement getting CSV files dynamically instead of fetching them from fs
- need to find data source that provides sector and symbol data. 
- Links below only provide symbol and company name, not sector.
'''
def get_nyse_df():
    r = requests.get(
        'https://pkgstore.datahub.io/core/nyse-other-listings/nyse-listed_csv/data/3c88fab8ec158c3cd55145243fe5fcdf/nyse-listed_csv.csv')
    data =io.StringIO(r.text)
    df = pd.read_csv(data, sep=",")
    return df

def get_nasdaq_dfv():
    r = requests.get(
        'https://pkgstore.datahub.io/core/nasdaq-listings/nasdaq-listed-symbols_csv/data/595a1f263719c09a8a0b4a64f17112c6/nasdaq-listed-symbols_csv.csv')
    data =io.StringIO(r.text)
    df = pd.read_csv(data, sep=",")
    return df
