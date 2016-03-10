var DB = {
	mysql : null,
	pool  : null,
	init  : function(config){
		console.log("Start DB Config");
		exports.init = function(config){
			DB.configureDB(config);
		}
		exports.getConnection = function(callback) {
		    DB.poll.getConnection(function(err, connection) {
		        callback(err, connection);
		    });
		};
	},
	configureDB : function(config){
		DB.mysql = require('mysql');
		DB.poll  = DB.mysql.createPool(config.db);
	}
};

DB.init();