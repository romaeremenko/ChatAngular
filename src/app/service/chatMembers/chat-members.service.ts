import {Injectable} from '@angular/core';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {BehaviorSubject, interval, Observable, Subject} from 'rxjs';
import {User} from '../../interface/chat/users';
import {Member} from '../../interface/chat/member';

@Injectable({
  providedIn: 'root'
})
export class ChatMembersService {

  static members = new BehaviorSubject([]);

  constructor(private chatAPIService: ChatAPIService) {
  }

  public getMembers() {
    interval(1000).subscribe( _ => {
      this.chatAPIService.getMembers().subscribe((members) => {
        ChatMembersService.members.next(this.transormMember(members));
      });
    });
  }

  private transormMember(members) {
    members = members.map((r) => {
      return {username: r.username, status: r.status.toString() === 'active'};
    });
    return members;
  }
}