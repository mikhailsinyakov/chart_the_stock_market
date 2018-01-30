'use strict';

const getStockData = require('../common/getStockData.server.js');
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
		
	app.route('/api/addStock/:symbol')
		.post(stocksHandler.addStock);
		
	app.route('/api/removeStock/:symbol')
		.delete(stocksHandler.removeStock);
	
	app.route('/api/getStockData/:symbol')
		.get(getStockData);
};
