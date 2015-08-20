var express = require('express');
var app = express();
var Twitter = require('mtwitter');


app.get('/tweets/:username', function (req, res) {
	var username = req.params.username;

	var twit = new Twitter({
		  consumer_key: 'QeSblDsr4Zt10hnvv6k48IfWd',
		  consumer_secret: 'FywMLNnLNyUDYTctuAmf2PebKNi75EUvKCzvq1KrDJ8fo1N8hI',
		  access_token_key: '550201571-6sgc5SNDGLgF0H6aVFnbnp72Q1axSFIhD5iECp2x',
		  access_token_secret: 'o9yHJQCCmlmUBKDIMC3fR8F0MS7ZCpJh9JQs30g15v7D2'
	});

	twit.get('statuses/user_timeline', { screen_name: username }, function (err, tweets) {
		if (err) {
			res.end('Can not get information');
			console.error(err);
		}

		res.locals = { tweets: tweets, name: username };
		res.render('tweets.ejs');
	});
}).listen(6789);