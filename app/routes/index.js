'use strict';

const AlphaVantageAPI = require('../controllers/alphaVantageAPI.server.js');
const path = process.cwd();
const alphaVantageAPI = new AlphaVantageAPI();

module.exports = (app) => {

	app.route('/')
		.get((req, res) => {
			res.sendFile(path + '/public/index.html');
		});
	
	app.route('/api/stocks/:symbol')
		.get(alphaVantageAPI.getStockHistory);
};
