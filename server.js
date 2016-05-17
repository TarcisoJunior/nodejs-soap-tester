/* SOAP Webservice Tester 
Tarciso Martins Junior
tarciso.junior@gmail.com */

var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	porta= 1620,
	soap = require('soap');

app.get('/', function(req, res){
	res.sendFile(__dirname+ '/views/index.html');
});

app.get('/test_soap', function(req, res){
	res.sendFile(__dirname+'/views/soap_test.html');
});

app.get('/consulta', function(req, res){
	res.send('consulta a webservice soap em implantação');
});

app.get('/consulta/:url/:metodo/:parametros', function(req, res){
	  var url = req.params.url;
	  var args = req.params.parametros;
	  args=JSON.parse(args),
	  soap.createClient(url, function(err, client) {
	  	  var clientMethod = eval('client.'+req.params.metodo);
	      clientMethod(args, function(err, result) {
	          res.send(result);
	      });
	  });
});

server.listen(porta);
console.log("listening on "+porta);