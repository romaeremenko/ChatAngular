import { Injectable } from '@angular/core';
import {BreakpointObserver} from "@angular/cdk/layout";
import {BehaviorSubject} from "rxjs/index";

@Injectable()
export class PhoneViewService {
  private layoutChanges;
  private isPhone = new BehaviorSubject(false);

  constructor(private breakpointObserver: BreakpointObserver) {
    this.layoutChanges = breakpointObserver.observe([
      '(max-width: 425px)'
    ]).subscribe(result => {
      this.isPhone.next(result.matches);
    });
  }

  public getIsPhone(){
    return this.isPhone;
  }
}
