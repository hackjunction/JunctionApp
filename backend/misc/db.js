const mongoose = require('mongoose');
const Promise = require('bluebird');
mongoose.Promise = Promise;

const connect = () => {
	mongoose.connect(global.gConfig.MONGODB_URI, { useNewUrlParser: true });

	const db = mongoose.connection;
	db.on('error', (err) => {
		console.log('Mongoose error: ', err);
	});
	db.once('open', () => {
		console.log('Mongoose connected to: ', global.gConfig.MONGODB_URI);
	});

}

module.exports = {
	connect
};