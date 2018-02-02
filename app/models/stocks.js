'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stock = new Schema({
	symbol: String,
	name: String,
	sector: String
});

module.exports = mongoose.model('Stock', Stock);
