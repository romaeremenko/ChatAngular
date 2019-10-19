import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersChatRoomComponent } from './members-chat-room.component';

describe('MembersChatRoomComponent', () => {
  let component: MembersChatRoomComponent;
  let fixture: ComponentFixture<MembersChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
