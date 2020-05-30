import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { ChatComponent } from './chat.component';
import {BlockWidthDirective} from "../directive/block-width.directive";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";
import {ShowTabsService} from "../service/showTabs/show-tabs.service";
import {PhoneViewService} from "../service/phoneView/phone-view.service";

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let el;
  let zero = "ui-lg-0 ui-g-0 ui-md-0 ui-sm-0";
  let six = 'ui-lg-6 ui-g-6 ui-md-6';
  let nine = 'ui-lg-9 ui-g-9 ui-md-9 ui-sm-0';
  let twelve = "ui-lg-12 ui-g-12 ui-md-12 ui-sm-12";
  let phoneWidth = "ui-lg-3 ui-g-3 ui-md-0 ui-sm-12";

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ChatComponent,
        BlockWidthDirective
      ],
      providers:[ShowTabsService,
        PhoneViewService],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    el = fixture.debugElement.query(By.directive(BlockWidthDirective)).nativeElement.childNodes;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('chat class width when members and chat panels hiding', () => {
    //fixture.detectChanges();
    expect(el[1].className).toBe(twelve);
  });

  it('chat class width when members panel showing and chat panel hiding', () => {
    component.showTabsService.setDisplayMembers();
    expect(el[1].className).toBe(nine);
  });

  it('chat class width when members panel hiding and chat panel showing', () => {
    component.showTabsService.setDisplayChats();
    expect(el[1].className).toBe(nine);
  });

  it('chat class width when members and chat panels showing', () => {
    component.showTabsService.setDisplayChats();
    component.showTabsService.setDisplayMembers();
    expect(el[1].className).toBe(six);
  });

  it('hiding chat log on phone view when members panel shows', () => {
    component.phoneViewService.getIsPhone().next(true);
    component.showTabsService.setDisplayMembers();
    expect(el[1].className).toBe(nine);
  });

  it('hiding chat log on phone view when chats panel shows', () => {
    component.phoneViewService.getIsPhone().next(true);
    component.showTabsService.setDisplayChats();
    expect(el[1].className).toBe(nine);
  });

  it('show chats panel shows on phone view', () => {
    component.phoneViewService.getIsPhone().next(true);
    component.showTabsService.setDisplayChats();
    expect(el[0].className).toBe(phoneWidth);
  });

  it('show members panel shows on phone view', () => {
    component.phoneViewService.getIsPhone().next(true);
    component.showTabsService.setDisplayMembers();
    expect(el[2].className).toBe(phoneWidth);
  });
});
