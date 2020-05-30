import { Component, Input, OnDestroy } from '@angular/core';
import { Member } from '../../../interface/chat/member';
import { ChatService } from '../../../service/chatAPI/chat.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnDestroy {
  @Input() member: Member;
  titleStyle = `containerName marginName name sairaRegular18`;
  createRoom = false;
  subscr;
  title = '';

  constructor(private chatAPIService: ChatService) {}

  submitForm(title: string): void {
    this.subscr = this.chatAPIService
      .createChatRoom(this.member.username, title)
      .subscribe(
        () => {},
        () => {
          alert('Чат с пользователем уже существует');
        }
      );
    this.toggleCreateRoom();
  }

  createRoomWindow(): void {
    this.toggleCreateRoom();
  }

  exit(): void {
    this.toggleCreateRoom();
  }

  toggleCreateRoom(): void {
    this.createRoom = !this.createRoom;
  }

  ngOnDestroy() {
    if (!!this.subscr) {
      this.subscr.unsubscribe();
    }
  }
}
