const ccxt      = require ('ccxt')
    , fs        = require ('fs')
    , log       = require ('ololog').configure ({ locate: false })



const exch = ["binance", "bittrex"];

async function init(exchangesIds) {
    let exchanges = {}
    if(typeof exchangesIds !== "undefined" && exchangesIds.length) {
        for(id in exchangesIds) {   
            log(id)
            let exchange =   new ccxt[ exchangesIds[id] ]() 
            // save it in a dictionary under its id for future use
            exchanges[ exchangesIds[id] ] = await exchange.fetchTickers ()
            // getUsdPrice ("BNB", exchange).then(res=> {
            //     log ( res  )

            // })
        }
    }
    return exchanges;
}

init(exch).then(async res => {
    const exchange = res[ exch[0] ];
    let ext =   new ccxt[ exch[0] ]() 
    const exchMarketsKeys = Object.keys(exchange).map(item => sliceMarketSymbol( item ) )

    const uniqKeys = ccxt.unique( exchMarketsKeys )

    const byMarkets = generateObjectByMarket( Object.values(exchange) )
    const filteredByVolume = getTopFiveVolumeMarket( byMarkets, 1 )
    const marketsWithPrice = await addMarketBaseUsdPrice( filteredByVolume, ext )
    const getTgScheme = generateTgCoinScheme( exch[0], marketsWithPrice )
    // log ( ccxt.unique( uniqKeys ) )
    
    
});

const initialCoin = {
    symbol: undefined,
    datetime: undefined,
    last: undefined,
    timestamp: undefined,
    quoteUsdPrice: undefined,
    quoteVolume: undefined,
    percentage: undefined,
    change: undefined,
}

function Coin(obj = initialCoin) {
    for(let key of obj) {
        // TODO: replace static data
        log( checkKeysInterface(key[1].list[0], initialCoin) )
    }
    return obj; 
}

function checkKeysInterface(object, initial) {
    const result = {};
    for(let key in initial) {
        result[ key ] = object[ key ]
    }
    return result;
}

function generateTgCoinScheme(name, obj) {

    let result = {
        name: name,
        topVolumeByMarkets: undefined,
        topFiveVolume: undefined,
        topGrow: undefined,
        topLose: undefined,
        tags: undefined,
    }
    
    const values = Object.entries(obj)
    Coin(values) 
    for(let key of values) {

    }
    return result
}

function sliceMarketSymbol(market) {
    return market.slice(market.indexOf("/") + 1)
}

async function addMarketBaseUsdPrice(markets, exchange) {
    const keys = Object.keys(markets)
    for(let key of keys) {
        if(key.indexOf('USD') !== -1) {
            markets[ key ] = {
                price: 1,
                list: markets[ key ],
            }
        } else {
            let price = await getUsdPrice(key, exchange)
            markets[ key ] =  {
                price: price.last,
                list: markets[ key ],
            }
        }
    }

    return markets
}

async function getUsdPrice(quoteSymbol, exchange) {
    const usd = [ "USD", "USDT" ]
    
    let tiker = null;
    for(let currency in usd) {
        try {
            tiker = await exchange.fetchTicker( `${quoteSymbol}/${usd[ currency ]}`)
            break;
        } catch(e) {
            // throw Error(e)
        }
    }
    return tiker;
}

function generateObjectByMarket(exchange) {
    const obj = {};
    exchange.forEach(market => {
        const marketId = sliceMarketSymbol(market.symbol)    
        obj[ marketId ] = obj[ marketId ] ?  [ ...obj[ marketId ], market ] : [ market ]
    })

    return obj;
}

function getTopFiveVolumeMarket(markets, limit) {
    for(let market in markets) {
        markets[ market ] = sortByVolume( markets[ market ] ).slice(0, limit ? limit : markets[ market ].length ) 
    }
    return markets;
}

function sortByVolume(exchange) {
    return exchange.sort( (a, b) => b.quoteVolume - a.quoteVolume)
}
// let printTicker = async (exchange, symbol) => {
//     let ticker = await exchange.fetchTicker (symbol)
//     log (exchange.id.green, symbol.yellow, 'ticker',
//         ticker['datetime'],
//         'high: '    + ticker['high'],
//         'low: '     + ticker['low'],
//         'bid: '     + ticker['bid'],
//         'ask: '     + ticker['ask'],
//         'volume: '  + ticker['baseVolume'])
//     return ticker
// }