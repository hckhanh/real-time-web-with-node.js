var gulp = require('gulp');
var nodemon = require('nodemon');

gulp.task('default', function() {
	nodemon({
		script: 'demo-socket.io.js',
	    ext: 'js',
	    ignore: ['./node_modules/'],
	}).on('restart', function () {
  		console.log('restarted!');
	})
});