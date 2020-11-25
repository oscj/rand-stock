'''
    News functions here

    Oscar Jaimes
    Nov 25 2020
'''
import feedparser

def get_news_by_ticker(ticker):
    '''
        News by ticker from google rss feed
    '''
    url = "http://news.google.com/news?q={}+stock&output=rss".format(ticker)
    print(url)
    NewsFeed = feedparser.parse(url)
    return { 'articles' : NewsFeed['entries']}

