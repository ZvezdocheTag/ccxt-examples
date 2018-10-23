
exports.fetchMarkets = async function(exch) {

    const result = await exch.fetchMarkets()

    return result;
}