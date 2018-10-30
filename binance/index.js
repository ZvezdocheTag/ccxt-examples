"use strict";

const ccxt      = require ('ccxt')
const fs        = require ('fs')

const binance = new ccxt.binance()

async function  load() {
    // await binance.loadMarkets()
    console.log("________________________________________________", "1")
    const tick =  await binance.fetchTickers()
    

    console.log("________________________________________________")
    console.log(tick )
    // console.log(binance.commonCurrencies)
    
    // List what i need 
    /**
     * 
     * symbols - available markets
     * currencies_by_id - list of coins with some infor
     */
}
load()
async function factoryMethods(exchange) {
    return {
        fetchMarkets: async function() {
            const result = await exchange.fetchMarkets()
        
            return result;
        },
        loadMarkets: async function() {
            const result = await exchange.loadMarkets()
            //  LIST OF CURRENCY ON EXCHANGES
            console.log(exchange.currencies                 )
            // LIST OF SUPPORTED PAIRS ON EXCHANGES
            console.log(exchange.symbols                 )
            return result;
        },
        fetchTikers: async function() {
            const result = await exchange.fetchTikers()
        
            return result;
        },
        fetchCurrencies: async function() {
            const result = await exchange.fetchCurrencies()
        
            return result;
        },
        fetchOrderBook: async function() {
            const result = await exchange.fetchOrderBook()
        
            return result;
        },
        fetchOHLCV: async function(symbol) {
            // symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}
 
            const result = await exchange.fetchOHLCV(symbol)
        
            return result;
        },
        fetchTrades: async function(symbol) {
            const result = await exchange.fetchTrades(symbol)
        
            return result;
        },
        currency: async function() {
            const result = await exchange.currency
        
            return result;
        }
    }
}

// factoryMethods(binance).then(resolve => {
//     const p1 = resolve.loadMarkets();

//     Promise.all([p1]).then(values => { 
//         console.log(values); 
//       });
// })


