var express = require('express');
var bodyParser = require('body-parser');
var pg = require('pg');

var conString = "postgres://vesko:Veskotesco69@hsoc-prod.cwyfzstkekxt.eu-west-1.redshift.amazonaws.com:5439/dev";
var client = new pg.Client(conString);
	client.connect(function(err){
		if(err)
			return console.error('could not connect to postgres', err);
	});

var port = 3000;
var server = express();
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.listen(port, function(){
	console.log('server listening on port ' + port);
});

server.get('/', function (req, res) {
  res.sendFile(__dirname + "/public/" + "index.html");
});

server.post('/', function(req,res){
	var results = [];
	var query;
	console.log(req);
	
	var type;
	switch(req.body.type){
		case "1" : type = "primary_type";
		break;
		case "2" : type = "'SEXUAL OFFENSE'";
		break;
		case "3" : type = "'NARCOTICS'";
		break;
		case "4" : type = "'THEFT'";
		break;
		case "5" : type = "'HOMICIDE'";
		break;
	}
	if(req.body.dateFrom != ""){
		var dateFrom = "'" + req.body.dateFrom + " 00:00:00'";
	}
	else{
		var dateFrom = "'0001-01-01 00:00:00'";
	}
	if(req.body.dateTo != ""){
		var dateTo = "'" + req.body.dateTo + " 00:00:00'";
	}
	else{
		var dateTo = "'2016-10-06 00:00:00'"
	}
	
	switch(req.body.display){
		default:
		case '1' : query = client.query("select * from(select COUNT(id), primary_type as column from crimes where primary_type != 'OTHER OFFENSE' and primary_type = " + type + " and date_time >= " + dateFrom + " and date_time <= " + dateTo + " group by primary_type ORDER BY COUNT(id) DESC) limit 5");
					break;
		case '2' : query = client.query("select COUNT(id), domestic as column from crimes where primary_type = " + type + " and date_time >= " + dateFrom + " and date_time <= " + dateTo + " group by domestic order by COUNT(id) DESC");
					break;
		case '3' : query = client.query("select COUNT(id), arrest as column from crimes where primary_type = " + type + " and date_time >= " + dateFrom + " and date_time <= " + dateTo + " group by arrest order by COUNT(id) DESC");
					break;
		case '4' : query = client.query("select * from(select COUNT(id),district as column from crimes where primary_type = " + type + " and date_time >= " + dateFrom + " and date_time <= " + dateTo + " group by district ORDER BY COUNT(id) DESC) limit 5");
					break;
	}
	query.on('row', (row) => {
		results.push(row);
	});
	query.on('end', () => {
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(results));
	});
});

server.get('/get_primary_type', function(req,res){
	var results = [];

	var query = client.query("select * from(select COUNT(id), primary_type as column from crimes where primary_type != 'OTHER OFFENSE' group by primary_type ORDER BY COUNT(id) DESC) limit 5");
	query.on('row', (row) => {
		results.push(row);
	});
	query.on('end', () => {
		console.log(results);
		res.setHeader('Content-Type', 'application/json');
		res.send(JSON.stringify(results));
	});
});