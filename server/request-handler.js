/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var messageData = [];

var requestHandler = function(request, response) {

  var messageUrl = "classes";
  // var testServerUrl = "/classes/room1";
  var statusCode;
  console.log("Serving request type " + request.method + " for url " + request.url);
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "application/json";
  var requestUrl = request.url;
  var splitRequest = requestUrl.split("/");

  if(splitRequest[1] === messageUrl){

    if(request.method === "POST"){
      request.on('data', function(msg){
        console.log(msg.toString());
        messageData.push(JSON.parse(msg.toString()));
        statusCode = 201;
        console.log("got message");
        response.writeHead(statusCode, headers);
        response.end();
      });
    } else if (request.method === "GET"){
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end('{"results": ' + JSON.stringify(messageData)+ '}');
      // console.log(response._responseCode, response._ended);
    }

  } else {
    statusCode = 404;
    response.writeHead(statusCode, headers);
    response.end('Not found');
  }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;


