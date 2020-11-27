## rand-stock

A random stock selector dedicated to the [r/wallstreetbets](https://reddit.com/r/wallstreetbets) community

[1k+ upvotes on r/stocks](https://www.reddit.com/r/stocks/comments/k18aya/random_stocks/) but only 2 stars on GitHub 

-------
Have you ever wanted to start investing but couldn't decide what stock to pour your life savings in to? Then wsb-rand-stock is the product for you. Using advanced propietary algos, wsb-rand-stock reccomends* a great stock for you to invest in. You will never have to conduct market analysis again with this product. 

No more TSLA calls. No more PLTR calls. Put all your money in a random stock and [perform better than the S&P500](https://www.youtube.com/watch?v=NfSGm9DDQ3o&ab_channel=Node14)

Honestly, I couldn't find a random stock generator that I truly loved. So I decided to make my own. Shows you standard stats for the stock as well as most recent news specific to that stock.

### How it works
- Python server (Flask)
- JS, HTML & CSS (Bootstrap) client side
- Uses [yfinance](https://pypi.org/project/yfinance/) and market data CSV files to fetch information on a random stock from a specific market & sector
- Graphs are generated with [Trading View](https://www.tradingview.com/)
- Google news rss to fetch stock specific news


### TODO
- Tracked in issues

### Acknowledgment
Some of the backend python code was greatly inspired by the [get-all-tickers](https://github.com/shilewenuw/get_all_tickers) library made by [Shile Wen](https://github.com/shilewenuw). Because of the [NASDAQ anti scrapping mechanism](https://github.com/shilewenuw/get_all_tickers/issues/4), I wasn't able to use this library on the server side.

