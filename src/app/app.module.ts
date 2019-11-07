import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ChatComponent} from './chat/chat.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './login/registration/registration.component';
import {ChatGuard} from './chat.guard';
import {HttpClientModule} from '@angular/common/http';
import {ChatAPIService} from './service/chatAPI/chat-api.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HeaderChatRoomComponent} from './chat/header-chat-room/header-chat-room.component';
import {LogsChatRoomComponent} from './chat/logs-chat-room/logs-chat-room.component';
import {MessagesChatRoomComponent} from './chat/messages-chat-room/messages-chat-room.component';
import {MembersChatRoomComponent} from './chat/members-chat-room/members-chat-room.component';
import {AvatarComponent} from './chat/share/avatar/avatar.component';
import {ChatMembersService} from './service/chatMembers/chat-members.service';
import {SortByStatusPipe} from './pipe/sort-by-status.pipe';
import { MessageComponent } from './chat/messages-chat-room/message/message.component';
import {ChatMessagesService} from './service/chatMessages/chat-messages.service';
import {CompareDate} from './service/compareDate/compare-date.service';
import {InputMessageComponent} from './chat/messages-chat-room/input-message/input-message.component';
import {InputMessageService} from './service/inputMessage/input-message.service';
import { RoomComponent } from './chat/logs-chat-room/room/room.component';
import { MemberComponent } from './chat/members-chat-room/member/member.component';
import { CreateRoomComponent } from './chat/members-chat-room/create-room/create-room.component';
import { ChangeInfoComponent } from './chat/header-chat-room/change-info/change-info.component';
import { AngularResizedEventModule } from 'angular-resize-event';

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
    RoomComponent,
    MemberComponent,
    CreateRoomComponent,
    ChangeInfoComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularResizedEventModule
  ],
  providers: [
    ChatGuard,
    ChatAPIService,
    ChatMembersService,
    ChatMessagesService,
    CompareDate,
    InputMessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
