var express = require('express');
var React = require('react');
var Router = require('react-router');

var app = express();

app.set('views', __dirname + '/../src/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/../src/root'));

app.get('*', function(req, res) {
  res.render('index')
});

var serverPort = process.env.PORT || 3000;
var serverAddress = process.env.ADDRESS || 'localhost';
var server = app.listen(serverPort, serverAddress, function() {
  var host = server.address().address;
  var port = server.address().port;
  console.log(server.address());
  console.log('War.re site listening at http://%s:%s', host, port);
});