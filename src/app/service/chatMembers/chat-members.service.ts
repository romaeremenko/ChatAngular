import {Injectable} from '@angular/core';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {BehaviorSubject, interval, Observable, Subject, timer} from 'rxjs';
import {User} from '../../interface/chat/users';
import {Member} from '../../interface/chat/member';
import {ChatMessagesService} from '../chatMessages/chat-messages.service';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatMembersService {

  static members = new BehaviorSubject([]);
  static membersLength = 0;

  constructor(private chatAPIService: ChatAPIService) {
  }

  public getMembers() {
    return timer(0, 5000).subscribe(_ => {
      this.chatAPIService.getMembers().subscribe((members) => {
        if (ChatMembersService.membersLength !== members.length) {
          ChatMembersService.membersLength = members.length;
          ChatMembersService.members.next(this.transormMember(members));
        }
      });
    });
  }

  private transormMember(members) {
    members = members.map((member) => {
      return {username: member.username, status: member.status.toString() === 'active'};
    });
    return members.filter(member => member.username !== this.chatAPIService.user.username);
  }
}
