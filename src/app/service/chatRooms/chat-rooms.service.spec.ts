import {discardPeriodicTasks, fakeAsync, getTestBed, TestBed, tick} from '@angular/core/testing';

import {ChatRoomsService} from './chat-rooms.service';
import {ChatService} from "../chatAPI/chat.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {skip} from "rxjs/operators";

describe('ChatRoomsService', () => {
  let injector: TestBed;
  let ChatServiceMock: ChatService;
  let service: ChatRoomsService;
  let httpMock: HttpTestingController;
  const bathPath = 'https://studentschat.herokuapp.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatService, ChatRoomsService],
    });
    injector = getTestBed();
    ChatServiceMock = injector.get(ChatService);
    service = injector.get(ChatRoomsService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: ChatRoomsService = TestBed.get(ChatRoomsService);
    expect(service).toBeTruthy();
  });

  it('get chats by get request',fakeAsync(() =>{
    const chats = ChatRoomsService.chats.pipe(skip(1));
    ChatServiceMock.user.username = 'andreyyaz';
    const dummyChats = {
      chats: [
        {
          chatroom_id: "MAIN",
          name: "Main"
        },
        {
          owner: "andreyyaz",
          invitees: "loans",
          chatroom_id: "103143811-1122962595",
          name: "Test Chat2"
        },
        {
          owner: "Some User",
          invitees: "andreyyaz",
          chatroom_id: "1122962595-642064521",
          name: "Test Chat"
        }
      ]
    };
    service.getChats();
    tick();
    discardPeriodicTasks();
    const subscribe = chats.subscribe(value => {
      console.log(value);
      expect(value).toEqual(dummyChats.chats);
    });
    subscribe.unsubscribe();
    const request = httpMock.expectOne(`${bathPath}/chatroom?username=${ChatServiceMock.user.username}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyChats);
  }));

});
