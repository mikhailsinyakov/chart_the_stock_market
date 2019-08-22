"use script";

const request = require('request');
const query = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
const apiKey = `&apikey=${process.env.ALFA_VANTAGE_API_KEY}`;

function getStockData(req, res) {
    const symbol = `&symbol=${req.params.symbol}`;
    const url = query + symbol + apiKey;
    request(url, (err, response, body) => {
        if (err) return res.sendStatus(503);
        const data = JSON.parse(body)["Time Series (Daily)"];
        let results = [];
        for (let key in data) {
            results.push({
                date: new Date(key),
                closePrice: data[key]["4. close"]
            });
        }
        results = results.filter((val, index) => index < 90);
        res.json(results);
    });
}

module.exports = getStockData;