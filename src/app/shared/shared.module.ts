import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthorizationUserService} from '../service/auth/authorization-user.service';
import {ChatGuard} from '../chat.guard';
import {CompareDate} from '../service/compareDate/compare-date.service';
import {AuthGuard} from '../auth.guard';
import {InputMessageService} from '../service/inputMessage/input-message.service';
import {AuthService} from '../service/chatAPI/auth.service';
import {LocalStorageService} from '../service/localStorage/local-storage.service';
import {ChatService} from '../service/chatAPI/chat.service';
import {ChatMembersService} from '../service/chatMembers/chat-members.service';
import {ChatRoomsService} from '../service/chatRooms/chat-rooms.service';
import {ChatMessagesService} from '../service/chatMessages/chat-messages.service';
import {RedirectToChatService} from '../service/auth/redirect-to-chat.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ChatGuard,
        AuthGuard,
        ChatRoomsService,
        ChatService,
        ChatMembersService,
        ChatMessagesService,
        CompareDate,
        InputMessageService,
        AuthorizationUserService,
        LocalStorageService,
        AuthService,
        RedirectToChatService
      ]
    };
  }
}
