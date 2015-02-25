/* Import node's http module: */
var http = require("http");
var _ = require("underscore");
var express = require('express');
var handler = require("./request-handler.js");
var bodyParser = require('body-parser');
var cors = require('cors')
var app = express();

var messageData = [];

var serverTheSecond = app.listen(1337, function(){
  var host = serverTheSecond.address().address;
  var port = serverTheSecond.address().port;

  console.log('example app listening at http://%s:%s', host, port);


});


app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());
app.use(cors());

// app.options('/', function(req, res) {
//   res.send(200);
// });

app.get('/classes/messages', function(req,res) {
  res.send(JSON.stringify({results: messageData}));
});

app.post('/classes/messages', function(req,res) {
  messageData.push(req.body);
  res.send(JSON.stringify('success'));
});


// Old server

// var port = 3000;
// var ip = "127.0.0.1";

// var server = http.createServer(handler.requestHandler);
// console.log("Listening on http://" + ip + ":" + port);
// server.listen(port, ip);


//We need our server at localhost:1337 to accept Json files at
//   http:localhost:1337/clasess/messages
