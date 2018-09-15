"use strict";

const ccxt      = require ('ccxt')
    , fs        = require ('fs')

 const coinmarketcap =   new ccxt.coinmarketcap({
    'enableRateLimit': true,
}) 
 const bittrex =   new ccxt.bittrex({
    'enableRateLimit': true,
}) 


 async function getMarkets() {
    const btcSymbol = 'BTC/USD'
    const fetchMarkets = await coinmarketcap.fetchMarkets() // coinmarketcap.markets
    const loadMarkets = await coinmarketcap.loadMarkets() // coinmarketcap.markets
    const fetchTicker = await coinmarketcap.fetchTicker(btcSymbol)
    const tickers = await coinmarketcap.fetchTickers ()
    const fetchCurrencies = await coinmarketcap.fetchCurrencies();

    const marketKeys = Object.keys(loadMarkets)
    const tickersKeys = Object.keys(tickers)
    const currenciesKeys = Object.keys(fetchCurrencies)
    
    const symbol = coinmarketcap.symbols[0]
    const currency = coinmarketcap.currencies[currenciesKeys[0]]
    const markets = coinmarketcap.markets
    // This code to understanding how should work requests
    // await ccxt.sleep (exchange.rateLimit)


    return {
        fetchMarkets: fetchMarkets[0],
        loadMarkets: loadMarkets[marketKeys[0]],
        fetchTicker: fetchTicker,
        fetchTickers: tickers[tickersKeys[0]],
        fetchCurrencies: [currenciesKeys[0]],
        symbol: symbol,
        currency: currency,
    };
}

module.exports = getMarkets;
