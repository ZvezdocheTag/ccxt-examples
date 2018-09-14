"use strict";

const ccxt      = require ('ccxt')
    , fs        = require ('fs')

    


async function ds() {
    const bit = new ccxt.bittrex()
    const sd = await bit.fetchMarkets()

    console.log(sd[0].limits, sd.length);
    return sd;
}

ds()