import feedparser

def get_news_by_ticker(ticker):
    NewsFeed = feedparser.parse("https://news.google.com/rss/search?q={}&hl=en-CA&gl=CA&ceid=CA:en".format(ticker))
    return { 'articles' : NewsFeed['entries']}

