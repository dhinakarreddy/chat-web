import { SocketService } from './services/socket.service';
import { MessageService } from './services/message.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router'; 
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { StompService } from 'ng2-stomp-service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

const appRoutes:Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: '**',
    component: LoginComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserModule
  ],
  providers: [AuthenticationService, AuthGuard, MessageService,SocketService, StompService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
