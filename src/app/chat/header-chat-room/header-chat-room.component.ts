import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChatAPIService} from '../../service/chatAPI/chat-api.service';
import {ChatMessagesService} from '../../service/chatMessages/chat-messages.service';
import {map} from 'rxjs/operators';
import {interval} from 'rxjs';

@Component({
  selector: 'app-header-chat-room',
  templateUrl: './header-chat-room.component.html',
  styleUrls: ['./header-chat-room.component.css']
})
export class HeaderChatRoomComponent implements OnInit, OnDestroy {

  createChangeInfo = false;
  clockObservable;
  onlineTimeObservable;
  onlineTime = 0;
  time;

  constructor(private chatAPIService: ChatAPIService, private chatMessagesService: ChatMessagesService) {
  }

  ngOnInit() {
    this.clockObservable = interval(1000).pipe(
      map(_ => {
        this.time = Date.now();
      })
    ).subscribe();
    this.onlineTimeObservable = interval(1000 * 60 * 5).pipe(
      map(_ => {
        this.onlineTime += 5;
      })
    ).subscribe();
  }

  logout() {
    this.chatAPIService.logout(ChatMessagesService.room.id, ChatMessagesService.room.name).subscribe(_ => {
    });
    window.location.reload();
  }

  submitForm(information) {
    this.chatAPIService.postInfo(information).subscribe(_ => {
    });
    this.toggleChangeInfoWindow();
  }

  createChangeInfoWindow() {
    this.chatAPIService.getInfo().subscribe(info => {
      this.chatAPIService.userInfo = info;
      this.toggleChangeInfoWindow();
    });
  }

  exit() {
    this.toggleChangeInfoWindow();
  }

  toggleChangeInfoWindow() {
    this.createChangeInfo = !this.createChangeInfo;
  }

  get getUserAvatar() {
    if (!!this.chatAPIService.user.avatarId) {
      return 'url(/assets/' + this.chatAPIService.user.avatarId + '.svg)';
    }
  }

  ngOnDestroy() {
    this.clockObservable.unsubscribe();
    this.onlineTimeObservable.unsubscribe();
  }
}
