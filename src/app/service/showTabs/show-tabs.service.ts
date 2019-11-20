import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ShowTabsService {
  private displayChats = new BehaviorSubject(false);
  private displayMembers = new BehaviorSubject(true);

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
    this.displayChats.next(!this.displayChats.value);
  }
}
