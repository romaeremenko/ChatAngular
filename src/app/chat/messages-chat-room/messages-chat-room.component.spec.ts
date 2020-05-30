import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { MessagesChatRoomComponent } from './messages-chat-room.component';

describe('MessagesChatRoomComponent', () => {
  let component: MessagesChatRoomComponent;
  let fixture: ComponentFixture<MessagesChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesChatRoomComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should count click', () => {
  //   // получаем div, для которого мы ставим директиву appCountClick
  //   let div = fixture.nativeElement.querySelector('button');
  //   div.click();
  //   expect(component.fff).toBe(true);
  // });
});
