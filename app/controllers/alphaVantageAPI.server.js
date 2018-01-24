"use script";

const request = require('request');
const query = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
const apiKey = `&apikey=${process.env.ALFA_VANTAGE_API_KEY}`;

function AlphaVantageAPI() {
    
    this.getStockHistory = (req, res) => {
        const symbol = `&symbol=${req.params.symbol}`;
        const url = query + symbol + apiKey;
        request(url, (err, response, body) => {
            if (err) res.sendStatus(503);
            const data = JSON.parse(body)["Time Series (Daily)"];
            const result = [];
            for (let key in data) {
                result.push({
                    date: new Date(key),
                    closePrice: data[key]["4. close"]
                });
            }
            res.json(result);
        });
    };
    
}

module.exports = AlphaVantageAPI;