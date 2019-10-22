import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatComponent} from './chat/chat.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './login/registration/registration.component';
import {AuthGuard} from './auth.guard';
import {HttpClientModule} from '@angular/common/http';
import {ChatAPIService} from './service/chatAPI/chat-api.service';
import {FormsModule} from '@angular/forms';
import {HeaderChatRoomComponent} from './chat/header-chat-room/header-chat-room.component';
import {LogsChatRoomComponent} from './chat/logs-chat-room/logs-chat-room.component';
import {MessagesChatRoomComponent} from './chat/messages-chat-room/messages-chat-room.component';
import {MembersChatRoomComponent} from './chat/members-chat-room/members-chat-room.component';
import {AvatarComponent} from './chat/share/avatar/avatar.component';
import {ChatMembersService} from './service/chatMembers/chat-members.service';
import {SortByStatusPipe} from './pipe/sort-by-status.pipe';
import { MessageComponent } from './chat/messages-chat-room/message/message.component';
import {ChatMessagesService} from './service/chatMessages/chat-messages.service';
import {DateService} from './service/date/date.service';
import { InputMessageComponent } from './chat/messages-chat-room/inputMessage/input-message/input-message.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderChatRoomComponent,
    LogsChatRoomComponent,
    MessagesChatRoomComponent,
    MembersChatRoomComponent,
    AvatarComponent,
    SortByStatusPipe,
    MessageComponent,
    InputMessageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    ChatAPIService,
    ChatMembersService,
    ChatMessagesService,
    DateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
