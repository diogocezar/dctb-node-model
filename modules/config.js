var Config = {
	db : {
		host     : '',
		user     : '',
		password : '',
		database : '',
		timezone : 'America/Sao_Paulo'
	},
	twitter: {
		consumer_key        : '',
		consumer_secret     : '',
		access_token_key    : '',
		access_token_secret : ''
	},
	instagram: {
		client_id     : '',
		client_secret : ''
	},
	init: function(){
		exports.db        = Config.db;
		exports.twitter   = Config.twitter;
		exports.instagram = Config.instagram;
	}
};

Config.init();