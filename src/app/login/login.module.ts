import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login.component';
import {ChatService} from '../service/chatAPI/chat.service';
import {RouterModule} from '@angular/router';
import {AuthGuard} from '../auth.guard';
import {LoginRoutingModule} from './login-routing.module';
import {AuthorizationUserService} from '../service/auth/authorization-user.service';
import {ChatMessagesService} from '../service/chatMessages/chat-messages.service';
import {CompareDate} from '../service/compareDate/compare-date.service';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  exports: [
    LoginComponent,
  ],
  providers: [
  ]
})
export class LoginModule { }
