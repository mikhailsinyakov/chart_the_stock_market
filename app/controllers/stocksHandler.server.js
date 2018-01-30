"use strict";

const Stocks = require('../models/stocks.js');

function StocksHandler() {
    
    this.getStocks = (req, res) => {
        
        Stocks.find({}, (err, results) => {
            if (err) return res.sendStatus(500);
            res.json(results);
        });
        
    };
    
    this.addStock = (req, res) => {
        const symbol = req.params.symbol;
        const newStock = new Stocks({name: symbol});
        newStock.save((err, newStock) => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        });
        
    };
    
    this.removeStock = (req, res) => {
        const symbol = req.params.symbol;
        Stocks.remove({name: symbol}, (err, stock) => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        });
    };
    
}

module.exports = StocksHandler;