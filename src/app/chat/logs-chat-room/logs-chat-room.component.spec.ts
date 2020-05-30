import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { LogsChatRoomComponent } from './logs-chat-room.component';

describe('LogsChatRoomComponent', () => {
  let component: LogsChatRoomComponent;
  let fixture: ComponentFixture<LogsChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LogsChatRoomComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogsChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
