import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { HeaderChatRoomComponent } from './header-chat-room.component';

describe('HeaderChatRoomComponent', () => {
  let component: HeaderChatRoomComponent;
  let fixture: ComponentFixture<HeaderChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderChatRoomComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
