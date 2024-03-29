## rand-stock

A random stock selector originally dedicated to the [r/wallstreetbets](https://reddit.com/r/wallstreetbets) community

[1k+ upvotes on r/stocks](https://www.reddit.com/r/stocks/comments/k18aya/random_stocks/) but only 5 stars on GitHub 

-------
Have you ever wanted to start investing but couldn't decide what stock to pour your life savings in to? Then rand-stock is the product for you. Using advanced proprietary algos,rand-stock recommends* a great stock for you to invest in. You will never have to conduct market analysis again with this product. 

No more TSLA calls. No more PLTR calls. Put all your money in a random stock and [perform better than the S&P500](https://www.youtube.com/watch?v=NfSGm9DDQ3o&ab_channel=Node14)

Honestly, I couldn't find a random stock generator that I truly loved. So I decided to make my own. 

### How it works
- Python Backend (Flask)
- React Frontend
- Uses [yfinance](https://pypi.org/project/yfinance/) and market data CSV files to fetch information on a random stock from a specific market & sector
- Graphs are generated with [Trading View](https://www.tradingview.com/)
- Google news rss to fetch stock specific news


### Acknowledgment
Some of the backend python code was greatly inspired by the [get-all-tickers](https://github.com/shilewenuw/get_all_tickers) library made by [Shile Wen](https://github.com/shilewenuw)