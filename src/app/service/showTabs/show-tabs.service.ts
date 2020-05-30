import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {PhoneViewService} from "../phoneView/phone-view.service";

@Injectable()
export class ShowTabsService {
  private displayChats = new BehaviorSubject(false);
  private displayMembers = new BehaviorSubject(false);

  constructor(private phoneViewService: PhoneViewService){}

  public getDisplayMembers() {
    return this.displayMembers;
  }

  public setDisplayMembers() {
    this.displayMembers.next(!this.displayMembers.value);
  }

  public getDisplayChats() {
    return this.displayChats;
  }

  public setDisplayChats() {
    if (this.phoneViewService.getIsPhone().value) {
      this.displayMembers.next(false);
    }
    this.displayChats.next(!this.displayChats.value);
  }
}
