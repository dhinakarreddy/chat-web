import { SocketService } from './../../services/socket.service';
import { Message } from './../../domain/message';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  username: string;
  public dataList: Message[] = [];
  subscription: Subscription;
  
  constructor(private authentication: AuthenticationService, private messageService: MessageService,
    private socketService: SocketService) {
    this.username = authentication.getUsername();
    this.subscription = this.messageService.getMessage().subscribe(agnMsg => {
      var agntmsg: Message = JSON.parse(agnMsg);
      //add message from socket response
      this.dataList.push(agntmsg);
    });

  }

  ngOnInit() {
  }

  replyMsg(msg) {
    var chatmsg: Message = new Message(this.username, msg);
    this.socketService.sendMessage(chatmsg);
  }
}
