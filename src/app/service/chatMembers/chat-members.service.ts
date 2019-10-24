import {Injectable} from '@angular/core';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {User} from '../../interface/chat/users';
import {Member} from '../../interface/chat/member';
import {ChatMessagesService} from '../chatMessages/chat-messages.service';

@Injectable({
  providedIn: 'root'
})
export class ChatMembersService {

  static members = new BehaviorSubject([]);
  static membersLength = 0;

  constructor(private chatAPIService: ChatAPIService) {
  }

  public getMembers() {
    return interval(5000).subscribe( _ => {
      this.chatAPIService.getMembers().subscribe((members) => {
        console.log(members);
        if (ChatMembersService.membersLength !== members.length) {
        ChatMembersService.members.next(this.transormMember(members));
      }});
    });
  }

  private transormMember(members) {
    members = members.map((r) => {
      return {username: r.username, status: r.status.toString() === 'active'};
    });
    return members;
  }
}
