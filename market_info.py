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


def get_nasdaq_csv():
    headers = {
        'authority': 'old.nasdaq.com',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'cross-site',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://github.com/shilewenuw/get_all_tickers/issues/2',
        'accept-language': 'en-US,en;q=0.9',
        'cookie': 'AKA_A2=A; NSC_W.TJUFEFGFOEFS.OBTEBR.443=ffffffffc3a0f70e45525d5f4f58455e445a4a42378b',
    }

    r = requests.get(
        'https://old.nasdaq.com/screening/companies-by-name.aspx?letter=0&exchange=nasdaq&render=download', headers=headers)
    data =io.StringIO(r.text)
    df = pd.read_csv(data, sep=",")
    print(df)
