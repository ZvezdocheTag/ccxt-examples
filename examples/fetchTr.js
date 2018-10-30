"use strict";

// ----------------------------------------------------------------------------

const ccxt = require ('ccxt')
    , log  = require ('ololog')
    , asTable = require ('as-table').configure ({ delimiter: ' | ' })

// ----------------------------------------------------------------------------

;(async () => {

    const exchange = new ccxt.bittrex ({
        'verbose': process.argv.includes ('--verbose'),
        'timeout': 60000,
    })

    try {
        let allTrades = []
        
        if (exchange.has['fetchTrades']) {
            let since = exchange.milliseconds () - 86400000 // -1 day from now
            // alternatively, fetch from a certain starting datetime
            // let since = exchange.parse8601 ('2018-01-01T00:00:00Z')
            console.log(exchange.milliseconds () > exchange.milliseconds () - 86400000)
            while (since < exchange.milliseconds ()) {
                console.log("trades")
                const symbol = 'BTC/ETH' // change for your symbol
                const limit = 20 // change for your limit
                const trades = await exchange.fetchTrades (symbol, since, limit);
                console.log(trades,"trades")
                if (trades.length) {
                    since = trades[trades.length - 1]
                    allTrades = trades
                    log.green ('Succeeded. f')
                } else {
                    break
                }
            }
        }

        log ( asTable(allTrades))
        log.green ('Succeeded.')

    } catch (e) {

        // log.dim ('--------------------------------------------------------')
        // log (e.constructor.name, e.message)
        // log.dim ('--------------------------------------------------------')
        // log.dim (exchange.last_http_response)
        log.error ('Failed.')
    }

}) ()