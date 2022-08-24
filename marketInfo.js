const dfd = require("danfojs-node");

// Not Exposed

/**
 * Helper func to load market data into dataframes
 * @returns {Array<Dataframes>} Array of dataframes of the market files
 */
const getDfs = async () => {
  const [nasdaq, amex, nyse, asx] = await Promise.all(
    [
      dfd.readCSV('./static/csv/nasdaq.csv'),
      dfd.readCSV('./static/csv/amex.csv'),
      dfd.readCSV('./static/csv/nyse.csv'),
      dfd.readCSV('./static/csv/asx.csv'),
    ]
  );
  return [nasdaq, amex, nyse, asx];
}

/**
 * Returns ticker list with unique elements, filtering out tickers with '.' and '^'
 * @param {Array<Object>} tickerList 
 * @returns {Array<String>}
 */
const parseTickers = (tickerList) => {
  const symbolList = [];
  tickerList.forEach((t) => symbolList.push(t.Symbol));
  return [...new Set(symbolList.filter((s) => !(s.includes('.') || s.includes('^'))))]
};


// Exposed

/**
 * @param {String} market Should be one of [NYSE, NASDAQ, AMEX, ASX]
 * @param {String} sector Should be a valid sector returned by getSectorList()
 * @returns 
 */
const getTickers = async (market, sector = '') => {
  const [nasdaq, amex, nyse, asx] = await getDfs();
  const tickerList = [];
  switch (market) {
    case 'NYSE':
      tickerList.push(parseTickers(dfd.toJSON(nyse.query(nyse['Sector'].eq(sector)))))
      break;
    case 'NASDAQ':
      tickerList.push(parseTickers(dfd.toJSON(nasdaq.query(nasdaq['Sector'].eq(sector)))))
      break;
    case 'AMEX':
      tickerList.push(parseTickers(dfd.toJSON(amex.query(amex['Sector'].eq(sector)))))
      break;
    case 'ASX':
      tickerList.push(parseTickers(dfd.toJSON(asx.query(asx['Sector'].eq(sector)))))
      break;
    default:
      throw new Error('Invalid market');
  }
  return tickerList;
};

/**
 * @returns {Array<String>} All possible sectors to search for
 */
const getSectorList = async () => {
  const dfs = await getDfs();
  const sectors = dfs.map((df) => {
    return [...new Set(dfd.toJSON(df['Sector'])['Sector'].filter((s) => s !== 'n/a' && s !== null))]
  });
  return [...new Set(sectors.flat())];
};


module.exports = {
  getTickers,
  getSectorList
}
