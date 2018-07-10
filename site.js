/*chat backend part*/
var app = require('express')();
var http = require('http');
var server = http.createServer(app);

//var data = [];
var data = '';

var io = require('socket.io')(server);

io.on('connection', function(socket){
	console.log('user is connected!!!');
	socket.on('disconnect', function(){
	    console.log('user disconnected');
	});
	/*event call for changing the room*/
	var room2 = 'music';

	socket.on('room', function(data2){		
		console.log(data2);
        room2 = data2.room;

        /*Assign value to global variable than pass to class variable*/
		console.log(room2);
		console.log('joining the room');

		socket.join(data2.room);
    }); 
	/*event call for boardcast the message*/
    socket.on('chat message', 
	function(msg){	
		console.log(room2);		
		console.log(msg);
		data = msg;		
		socket.broadcast.to(room2).emit('broadcast message', data);
		 
	 });
	
 });


server.listen(3000);