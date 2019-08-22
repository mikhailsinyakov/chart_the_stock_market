"use strict";

const companyList = require('../data/companylist.js');
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
        let stock = companyList.filter(val => val.Symbol == symbol)[0];
        if (!stock) stock = {
            symbol,
            name: '',
            sector: ''
        };
        const newStock = new Stocks({
            symbol,
            name: stock.Name,
            sector: stock.Sector
        });
        newStock.save((err, newStock) => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        });
        
    };
    
    this.removeStock = (req, res) => {
        const symbol = req.params.symbol;
        Stocks.remove({symbol}, (err, stock) => {
            if (err) return res.sendStatus(500);
            res.sendStatus(200);
        });
    };
    
}

module.exports = StocksHandler;