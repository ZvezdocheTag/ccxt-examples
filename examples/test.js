const ccxt      = require ('ccxt');




const sd = (async () => {
    const poloniex = new ccxt.poloniex()
    const tiker = await poloniex.fetchTicker ('BTC/USDT')
    const fetchTrades = await poloniex.fetchTrades ('BTC/USDT')
    
    console.log(fetchTrades)
})

sd()