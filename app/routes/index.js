'use strict';

const getStockData = require('../common/getStockData.server.js');
const StocksHandler = require('../controllers/stocksHandler.server.js');
const path = process.cwd();
const stocksHandler = new StocksHandler();
const isRussian = acceptLanguage => {
	const languages = acceptLanguage.match(/[a-zA-Z\-]{2,10}/g) || [];
	const language = languages[0] || 'en';
	return language === 'ru' || language === 'ru-RU';
};

module.exports = app => {

	app.route('/')
		.get((req, res) => {
			const acceptLanguage = req.header('Accept-Language');
			if (isRussian(acceptLanguage)) res.redirect('/ru');
			else res.sendFile(path + '/public/index.html');
		});

	app.route('/ru')
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
