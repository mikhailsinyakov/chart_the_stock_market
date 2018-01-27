'use strict';

const getStockHistory = require('../common/getTradeLineOfStock.server.js');
const StocksHandler = require('../controllers/stocksHandler.server.js');
const path = process.cwd();
const stocksHandler = new StocksHandler();

module.exports = (app) => {

	app.route('/')
		.get((req, res) => {
			res.sendFile(path + '/public/index.html');
		});
		
	app.route('/api/getStocks')
		.get(stocksHandler.getStocks);
	
	app.route('/api/getTradeLineOfStock/:symbol')
		.get(getStockHistory);
};
