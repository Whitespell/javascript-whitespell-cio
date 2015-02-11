
//Server + Socket.io
var app = require('express')(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.get(/^(.+)$/, function(req, res) {
  res.sendFile(__dirname + req.params[0]);
});

io.on('connection', function(socket){
  console.log('User connected');

  socket.on('clientReq', function(msg){
    console.log('Client: '+msg);
    socket.emit('serverReq', 'client we got no problems');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});