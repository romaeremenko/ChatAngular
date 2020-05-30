import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesChatRoomComponent } from './messages-chat-room/messages-chat-room.component';
import { ChangeInfoComponent } from './header-chat-room/change-info/change-info.component';
import { CreateRoomComponent } from './members-chat-room/create-room/create-room.component';
import { MessageComponent } from './messages-chat-room/message/message.component';
import { MemberComponent } from './members-chat-room/member/member.component';
import { ChatComponent } from './chat.component';
import { InputMessageComponent } from './messages-chat-room/input-message/input-message.component';
import { LogsChatRoomComponent } from './logs-chat-room/logs-chat-room.component';
import { RoomComponent } from './logs-chat-room/room/room.component';
import { HeaderChatRoomComponent } from './header-chat-room/header-chat-room.component';
import { AvatarComponent } from './share/avatar/avatar.component';
import { SortByStatusPipe } from '../pipe/sort-by-status.pipe';
import { MembersChatRoomComponent } from './members-chat-room/members-chat-room.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularResizedEventModule } from 'angular-resize-event';
import { ChatRoutingModule } from './chat-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { BlockWidthDirective } from '../directive/block-width.directive';

@NgModule({
  declarations: [
    ChatComponent,
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
    BlockWidthDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularResizedEventModule,
    SidebarModule,
    ChatRoutingModule
  ],
  exports: [
    ChatComponent,
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
    ChangeInfoComponent
  ],
  providers: []
})
export class ChatModule {}
