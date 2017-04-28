//var http = require('http'),
//url = require('url'),
//express = require('express'),
//app = express(),
//bodyParser = require('body-parser'),
//server = require('http').Server(app),
//WebSocketServer = require('ws').Server,
//wss = new WebSocketServer({server: server}),
//port = 8000;

//app.use(bodyParser.json());
//app.use(express.static(__dirname + '/public'));
const WebSocket = require('ws');
const wss = new WebSocket.Server({
   preMessageDeflate: false,
   port: 8000
});

wss.on('connection', function connection(ws){
   console.log('Server running...');
   ws.on('message', function incoming(message){
      var arr = message.toString().split(',');
      console.log('received: %s', arr[0]+', '+arr[1]);
   });
});

