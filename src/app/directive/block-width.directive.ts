import { Directive, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ShowTabsService } from '../service/showTabs/show-tabs.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import {PhoneViewService} from "../service/phoneView/phone-view.service";

@Directive({
  selector: '[appBlockWidth]'
})
export class BlockWidthDirective implements OnInit, OnDestroy {
  private elements;
  private subscribtions: Subscription[] = [];
  private zeroWidth = 'ui-lg-0 ui-g-0 ui-md-0 ui-sm-0';
  private threeWidth = 'ui-lg-3 ui-g-3 ui-md-0 ui-sm-12';
  private sixWidth = 'ui-lg-6 ui-g-6 ui-md-6';
  private nineWidth = 'ui-lg-9 ui-g-9 ui-md-9 ui-sm-0';
  private twelveWidth = 'ui-lg-12 ui-g-12 ui-md-12 ui-sm-12';

  constructor(private elementr: ElementRef,
              private showTabsService: ShowTabsService,
              public phoneViewService: PhoneViewService) {
    this.elements = elementr.nativeElement.childNodes;
  }

  ngOnInit() {
    this.subscribtions.push(
      this.showTabsService
        .getDisplayMembers()
        .subscribe(() => this.clicked(this.showTabsService.getDisplayChats().value, this.showTabsService.getDisplayMembers().value))
    );
    this.subscribtions.push(
      this.showTabsService
        .getDisplayChats()
        .subscribe(() => this.clicked(this.showTabsService.getDisplayChats().value, this.showTabsService.getDisplayMembers().value))
    );
    this.subscribtions.push(
      this.phoneViewService.getIsPhone().subscribe(() => {
        this.clicked(this.showTabsService.getDisplayChats().value, this.showTabsService.getDisplayMembers().value)
      })
    )
  }

  private clicked(isChatsShows, isMembersShows) {

    if (isChatsShows && isMembersShows) {
      this.changeStyle(this.threeWidth, this.sixWidth, this.threeWidth);
    }
    if (!isChatsShows && !isMembersShows) {
      if (this.phoneViewService.getIsPhone().value) {
        this.elements[1].style.display = 'flex';
      }
      this.changeStyle(this.zeroWidth, this.twelveWidth, this.zeroWidth);
    }
    if (isChatsShows && !isMembersShows) {
      this.changeStyle(this.threeWidth, this.nineWidth, this.zeroWidth);
    }
    if (!isChatsShows && isMembersShows) {
      if (this.phoneViewService.getIsPhone().value) {
        this.elements[1].style.display = 'none';
      } else {
        this.elements[1].style.display = 'flex';
      }
      this.changeStyle(this.zeroWidth, this.nineWidth, this.threeWidth);
    }
  }

  private changeStyle(first, second, third) {
    this.elements[0].classList.value = first;
    this.elements[1].classList.value = second;
    this.elements[2].classList.value = third;
  }

  ngOnDestroy() {
    this.subscribtions.forEach(subscribtion => subscribtion.unsubscribe());
  }
}
