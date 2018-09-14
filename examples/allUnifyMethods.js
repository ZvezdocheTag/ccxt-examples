"use strict";

const ccxt      = require ('ccxt')
    , fs        = require ('fs')

 const coinmarketcap =   new ccxt.coinmarketcap() 
 const bittrex =   new ccxt.bittrex() 


async function getMarkets() {
    const eachEnpointsStructure = {};
    const fetchMarkets = await coinmarketcap.fetchMarkets()
    const loadMarkets = await coinmarketcap.loadMarkets()
    
    const marketKeys = Object.keys(loadMarkets)

    return {
        fetchMarkets: fetchMarkets[0],
        loadMarkets: loadMarkets[marketKeys[0]]
    };
}

getMarkets().then(res => {

    console.log(res)
})
