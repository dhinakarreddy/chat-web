import { Message } from './../domain/message';
import { StompService } from 'ng2-stomp-service';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import { MessageService } from './message.service';

//@author : Dhinakar Reddy Pothireddi

@Injectable()
export class SocketService implements OnDestroy {

  ngOnDestroy() {
    this.disconnectFromStomp();
  }

  private subscription: any;
  private apiUrl = environment.apiUrl;
  constructor(private stomp: StompService, private messageService: MessageService) {
  }

  //configures and starts the socket listeners
  configureAndConnectToStomp() {
    this.stomp.configure({
      host: this.apiUrl + '/chat-messaging',
      debug: true,
      queue: { 'init': false }
    });

    this.stomp.startConnect().then(() => {
      this.stomp.done('init');
      console.log('connected');
      this.subscribeToSocket();
    });
  }

  //function that disconnects the socket communication. 
  //called on component destruction.
  disconnectFromStomp() {
    this.stomp.disconnect().then(() => {
      console.log('Connection closed')
    })
  }

  //send a request to websocket with agent id and subscribe for a msg
  subscribeToSocket() {
    this.subscription = this.stomp.subscribe('/chat/messages', data => {
      this.routepage(JSON.stringify(data))
    },
      error => alert(error),
    );
  }

  sendDataToSocket(jsonObj: string) {
    this.stomp.send('receiveMsg', jsonObj);
  }

  unsubscribeSocket() {
    this.subscription.unsubscribe();
  }

  routepage(newMsg: string) {
    this.messageService.sendMessage(newMsg);
  }

  sendMessage(msg){
    this.stomp.send("/app/message",msg);
  }
}
