import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private router:Router, private authentication:AuthenticationService, 
    private socketService: SocketService) { }

  loginUser(e){
    e.preventDefault();
    var uname= e.target.elements[1].value;
    var pwd = e.target.elements[3].value;
    e.target.elements[1].value = '';
    e.target.elements[3].value = '';
    if(uname!='' && pwd!=''){
      this.authentication.setUserLoggedIn(uname);
      this.socketService.configureAndConnectToStomp();
      this.router.navigate(['dashboard']);
    }
  }
}
