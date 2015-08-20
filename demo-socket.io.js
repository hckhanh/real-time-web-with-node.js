var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var redis = require('redis');
var redisClient = redis.createClient();

app.use('/public', express.static(__dirname + '/public'));
app.use(express.static( __dirname + '/views'));

app.get('/', function (req, res) {
	res.sendFile('/index.html');
});

var storeMessage = function (nickname, data) {
	var message = { nickname: nickname, data: data };
	redisClient.rpush('messages', JSON.stringify(message), function (err, reply) {
		redisClient.ltrim('messages', 0, 9);
	});
}

io.on('connection', function (client) { // client is socket
	console.log('Client connected...');

	client.on('messages', function (data) {
		client.broadcast.emit('messages', client.nickname + ': ' + data);
		storeMessage(client.nickname, data);
	});
	client.on('join', function (data) {
		client.nickname = data;
		redisClient.lrange('messages', 0, -1, function (err, messages) {
			messages.forEach(function (message) {
				message = JSON.parse(message);
				client.emit('messages', message.nickname + ': ' + message.data);
			});
		});
	});
});

server.listen(6789);