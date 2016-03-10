var Model = {
	io        : null,
	express   : null,
	app       : null,
	server    : null,
	config    : null,
	db        : null,
	twitter   : null,
	instagram : null,
	addr      : 'localhost',
	port      : '9999',
	init: function () {
		Model.config    = require('./modules/config');
		Model.db        = require('./modules/db');
		Model.io        = require('socket.io');
		Model.express   = require('express');
		Model.twitter   = require('twitter');
		Model.instagram = require('instagram-node').instagram();
		Model.app       = Model.express();
		Model.server    = require('http').createServer(Model.app);
		Model.io        = Model.io.listen(Model.server);
		Model.db.init(Model.config);
		Model.requests();
		Model.configureExpress();
		Model.routing();
	},
	requests: function(){
		Model.io.on('connection', function(socket){
			console.log("Someone connected");
			socket.on('requestDB', function(data){
				console.log("Sended some data from DB");
				Model.getMysql(socket);
			});
			socket.on('requestTweets', function(data){
				console.log("Started stream tweets");
				Model.getTweets(socket);
			});
			socket.on('requestInstagram', function(data){
				console.log("Started stream instagram");
				Model.getIgs(socket);
			});
		});
	},
	configureExpress: function(){
		Model.app.set('view engine', 'ejs');
		Model.app.use('/', Model.express.static(__dirname + '/assets'));
	},
	routing: function(){
		Model.app.get('/', function(req, res) {
			res.render('index');
		});
		console.log("Listening on port: " + Model.port)
		Model.server.listen(Model.port, Model.addr);
	},
	getIgs: function(socket){
		Model.instagram.use(Model.config.instagram);
		setInterval(function(){
			Model.instagram.tag_media_recent('blueeyes', function(err, result, remaining, limit){
				socket.emit('receiveNewInstas', result);
			});
		}, 5000);
	},
	getTweets: function(socket){
		var client = new Model.twitter(Model.config.twitter);
		client.stream(
			'statuses/filter',
			{
            	track: '#bbb16'
        	},
        	function(stream) {
				stream.on('data', function(tweet) {
					socket.emit('receiveNewTweet', tweet.text);
				});
				stream.on('error', function(error) {
					console.error(error);
				});
        	}
        );
	},
	getMysql: function(socket){
		Model.db.getConnection(function(err, conn){
	        if (err){
	            console.log("Failed to get connection");
	            console.log(err);
	            return;
	        }
	        conn.query('SELECT * FROM `agenda`', function(err, result){
	            if (err){
	                conn.release();
	                console.log("Failed to getCount");
	                console.log(err);
	                return;
	            }
	           	Model.data = result;
	           	console.log(Model.data);
	           	socket.emit('receiveNewData', Model.data);
	           	conn.release();
	           	return;
	        });
   		});
	}
}
Model.init();