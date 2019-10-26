import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../interface/chat/message';
import {Chatroom} from '../../../interface/chat/chatroom';
import {ChatMessagesService} from '../../../service/chatMessages/chat-messages.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  @Input() room: Chatroom;

  titleStyle = `containerName marginName name sairaRegular18`;

  constructor(private chatMessagesService: ChatMessagesService, private route: Router) {
  }

  ngOnInit() {
  }

  // changeRoom() {
  // }

  setRouterLink() {
    const link = '../chatroom/' + this.room.name.split(' ').join('');
    if (this.room.name === 'Main') {
      ChatMessagesService.room = {
        id: 'MAIN',
        name: 'Main'
      };
    } else {
      ChatMessagesService.room = {
        id: this.room.chatroom_id,
        name: this.room.name
      };
    }
    this.route.navigate([link]);
    this.setActive(this.room.name);
  }

  setActive(chatName) {
    const active = document.getElementsByClassName('alignLeft chatRoom');
    Array.from(active).forEach((el: HTMLElement) => {
      console.log(chatName, el.innerText, chatName === el.innerText);
      if (chatName === el.innerText) {
        console.log('123');
        el.className = 'alignLeft chatRoom active';
      } else {
        el.className = 'alignLeft chatRoom';
      }
    });
  }

}
