var express = require('express');
var bodyParser = require('body-parser');

var server = express();
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.post('/first.html', function(req, res){
	return res.redirect('/first.html');
});

var port = 10001;
server.listen(port, function(){
	console.log('server listening on port ' + port);
});