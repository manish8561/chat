import { Component } from '@angular/core';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';

const socket =  io('http://localhost:3000');
var  dd = {user:'',message:'',room:'music'};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})

export class AppComponent {
  title = 'app';
  datas = '';
  user = '';
  message = '';
  room = 'music';
  counter = 0;
  constructor() { }
   ngOnInit() {   
      socket.emit('room',{room:'music'});
     	socket.on('broadcast message', 
       	 	function(msg){
            console.log('from server: ');
    	   	 	console.log(msg);
    	   	 	/*Assign value to global variable than pass to class variable*/
    	   	 	dd = msg;
     		 });
      let that = this; 
      setInterval(function(){
        if(dd.message != ''){
          that.counter += 1;
          //that.user = dd.user
          var node = document.createElement("LI");
          node.innerHTML = '<strong>'+dd.user+' ('+dd.room+')</strong>: '+dd.message;
          document.getElementById('all_messages').appendChild(node)
          dd = {user:'', message:'', room:'music'};
        }
      }, 3000);
    }
    changeRoom(room.string){
      this.room = room;
      socket.emit('room',{room:room});
    }
    sendMessage(user:string, message:string, room:string){
      var custom_msg = {};
      if(message != ''){
        this.user = user;
        this.message = message;
        this.room = room;
        custom_msg = { user:this.user, message:this.message, room : this.room};
        
        var node = document.createElement("LI");
        node.innerHTML = '<strong>'+this.user+' ('+this.room+')</strong>: '+this.message;
        document.getElementById('all_messages').appendChild(node)
        socket.emit('chat message', custom_msg);
      }
    }
   
}