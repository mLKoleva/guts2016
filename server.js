var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');
var conString = "postgres://vesko:Veskotesco69@hsoc-prod.cwyfzstkekxt.eu-west-1.redshift.amazonaws.com:5439/dev";
var results = [];
var graphData = [];

var client = new pg.Client(conString);
	client.connect(function(err){
		if(err)
			return console.error('could not connect to postgres', err);
	})

var port = 3000;
var server = express();
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.listen(port, function(){
	console.log('server listening on port ' + port);
});

const query = client.query(
	"select * from(select COUNT(id), primary_type from crimes where primary_type != 'OTHER OFFENSE' group by primary_type ORDER BY COUNT(id) DESC) limit 5");

query.on('row', (row) => {
	results.push(row);
});

query.on('end', () => {
	for(var i = 0; i<results.length; i++){
		graphData[i] = {
			"title" : results[i]["primary_type"],
			"subtitle" : "",
			"ranges" : [0, results[i]['count']/2, 1300000],
			"measures" : [parseInt(results[i]['count']), parseInt(results[i]['count'])],
			"markers" : [parseInt(results[i]['count']) + 100]
		};
	}
});

/*server.post('/first.html', function(req, res){
	return res.redirect('/first.html');
});*/

server.post('/update_date', function(req,res){
	
});

server.get('/get_primary_type', function(req,res){
	res.setHeader('Content-Type', 'application/json');
	console.log(graphData);
	res.send(JSON.stringify(graphData));
});

