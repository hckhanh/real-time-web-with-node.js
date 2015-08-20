var http = require('http');
var fs = require('fs');

/*http.createServer(function (request, response) {
	var updateFile = fs.createWriteStream('stream2.js');
	request.pipe(updateFile);
	request.on ('end', function () {
		response.writeHead(200);
		response.end('Uploaded!');
	});
}).listen(6789);*/

http.createServer(function (request, response) {
	var updateFile = fs.createWriteStream('stream2.js');
	var fileSize = request.headers['content-length'];
	var uploadedSize = 0;
	request
		/*.on ('readable', function () {
			var chunk = null
			while (null != (chunk = request.read())) {
				uploadedSize += chunk.length;
				var process = (uploadedSize / fileSize) * 100;
				response.write('Upload process: ' + parseInt(process, 10) + '%\n');
			}
		})*/
		.on ('data', function (data) {
			uploadedSize += data.length;
			var process = (uploadedSize / fileSize) * 100;
			response.write('Upload process: ' + parseInt(process, 10) + '%\n');
		})
		.on ('end', function () {
			response.writeHead(200);
			response.end('Uploaded!');
		});

	request.pipe(updateFile);
}).listen(6789);