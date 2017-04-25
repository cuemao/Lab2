var url = require('url');
var fs = require('fs');
var querystring = require('querystring');

var router=exports;

if(typeof window === "undefined")
  window = {};

function error404(response){
  response.writeHead(404);
  response.write("opps this doesn't exist - 404");
  response.end();
}

function toHTML(path,response){
  fs.readFile(__dirname + path, function(error, data) {
    if (error){
      error404(response);
    } else {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write(data, "utf8");
      response.end();
    }
  });
}

router.route=function route(request,response){
  console.log("Connect from: " + request.connection.remoteAddress);
  var path = url.parse(request.url).pathname;

  switch (path) {
    case '/':
      fs.readFile(__dirname + "/index.html", function(error, data) {
        if (error){
          error404(response);
        } else {
          response.writeHead(200, {"Content-Type": "text/html",'Set-Cookie': "account=; expires="+ new Date(0)});
          response.write(data, "utf8");
          response.end();
        }
      });
      break;
    
    case '/push.html':
      toHTML(path,response);
      break;
    
    default:
      error404(response);
      break;
      
  }
}

