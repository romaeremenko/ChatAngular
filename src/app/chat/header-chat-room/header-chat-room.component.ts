import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../../service/chatAPI/chat.service';
import { ChatMessagesService } from '../../service/chatMessages/chat-messages.service';
import { map } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';
import { InfoAboutUser } from '../../interface/chat/infoAboutUser';
import { LocalStorageService } from '../../service/localStorage/local-storage.service';
import { AuthService } from '../../service/chatAPI/auth.service';
import { ShowTabsService } from '../../service/showTabs/show-tabs.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import {PhoneViewService} from "../../service/phoneView/phone-view.service";

@Component({
  selector: 'app-header-chat-room',
  templateUrl: './header-chat-room.component.html',
  styleUrls: ['./header-chat-room.component.css']
})
export class HeaderChatRoomComponent implements OnInit, OnDestroy {
  createChangeInfo = false;
  onlineTime = 0;
  time;
  private subscribtions: Subscription[] = [];

  constructor(
    private chatAPIService: ChatService,
    private authService: AuthService,
    private chatMessagesService: ChatMessagesService,
    private localStorageService: LocalStorageService,
    private showTabsService: ShowTabsService,
    private phoneViewService: PhoneViewService
  ) {}

  ngOnInit() {
    this.subscribtions.push(
      interval(1000)
        .pipe(
          map(() => {
            this.time = Date.now();
          })
        )
        .subscribe()
    );
    this.subscribtions.push(
      interval(1000 * 60 * 5)
        .pipe(
          map(() => {
            this.onlineTime += 5;
          })
        )
        .subscribe()
    );
  }

  logout(): void {
    this.localStorageService.deleteUserLoggedIn();
    this.authService
      .logout(this.chatAPIService.user.username, ChatMessagesService.room.id, ChatMessagesService.room.name)
      .subscribe(() => {});
    window.location.reload();
  }

  submitForm(information: InfoAboutUser): void {
    this.chatAPIService.postInfo(information).subscribe((f) => {console.log(f)});
    this.toggleChangeInfoWindow();
  }

  createChangeInfoWindow(): void {
    this.chatAPIService.getInfo().subscribe(info => {
      this.chatAPIService.userInfo = info;
      this.toggleChangeInfoWindow();
    });
  }

  exit(): void {
    this.toggleChangeInfoWindow();
  }

  toggleChangeInfoWindow(): void {
    this.createChangeInfo = !this.createChangeInfo;
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(subscribtion => subscribtion.unsubscribe());
  }

  get getUserAvatar(): string {
    if (!!this.chatAPIService.user.avatarId) {
      return 'url(/assets/' + this.chatAPIService.user.avatarId + '.svg)';
    }
  }
}
