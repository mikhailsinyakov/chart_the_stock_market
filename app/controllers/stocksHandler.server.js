"use strict";

const Stocks = require('../models/stocks.js');

function StocksHandler() {
    
    this.getStocks = (req, res) => {
        
        Stocks.find({}, (err, results) => {
            if (err) return res.sendStatus(500);
            res.json(results);
        });
        
    };
    
}

module.exports = StocksHandler;