import {Injectable} from '@angular/core';
import {ChatAPIService} from '../chatAPI/chat-api.service';
import {BehaviorSubject, Subscription, timer} from 'rxjs';
import {User} from '../../interface/chat/users';
import {Member} from '../../interface/chat/member';
import {switchMap} from 'rxjs/operators';

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

  private transormMember(members): Member[] {
    members = members.map((member) => {
      this.chatAPIService.usersAvatars[member.username] = member.avatarId;
      return {username: member.username, status: member.status.toString() === 'active', avatarId: member.avatarId};
    });
    return members.filter(member => member.username !== this.chatAPIService.user.username);
  }

  private isNewMembers(members: User[]): void {
    if (ChatMembersService.membersLength !== members.length) {
      ChatMembersService.membersLength = members.length;
      ChatMembersService.members.next(this.transormMember(members));
    }
  }
}
