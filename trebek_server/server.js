const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
const server = http.createServer();
server.listen(webSocketsServerPort);

var collection = new Map();
const connections = {};
var winner = 'null';
var isOpen = false;
var alreadyPressed = false;

const wsServer = new webSocketServer({
  httpServer: server
});


const updateWinner = (msg) => {
  Object.keys(connections).map((client) => {
    connections[client].sendUTF(msg)
  });
}



wsServer.on('request', function(request) {

  const connection = request.accept(null, request.origin);
  var userID = 'null';

  connection.on('message', function(message) {
  var msg;
  var signal = JSON.parse(message.utf8Data);
  if (signal.type == "join") {
    collection.set(signal.player.id, signal.player.user);
    userID = signal.player.id;
    connections[userID] = connection;
  }
  if (signal.type == "start") {
    isOpen = true;
    alreadyPressed = false;
  }
  if(signal.type == "reset") {
    isOpen = false;
    alreadyPressed = false;
    winner = 'null';
    msg = {"type":"reset", "content":"reset"}
    updateWinner(JSON.stringify(msg));
  }

  if (signal.type == "buzz") {
    if (alreadyPressed == true) {
      msg = {"type":"err", "content":"TOO LATE"}
      connection.send(JSON.stringify(msg));
    }
    else if (isOpen==false) {
      msg = {"type":"err", "content":"TOO EARLY"}
      connection.send(JSON.stringify(msg));
    } else {
      isOpen = false;
      alreadyPressed = true;
      winner = signal.player.user;
      updateWinner(JSON.stringify({"type":"winner", "content":winner}));
      msg = {"type":"congratulations", "content":"YUOR WINNER"}
      connection.send(JSON.stringify(msg));
    }
  } 

  if (winner !== 'null') {
    msg = {"type":"win", "user":winner}
    connection.send(JSON.stringify(msg));
  }

  })

  
  connection.on('close', function(connection) {
    collection.delete(userID);
    console.log(collection);
  })
})

