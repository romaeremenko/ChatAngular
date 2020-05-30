import {getTestBed, TestBed} from '@angular/core/testing';

import {ChatService} from './chat.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {User} from "../../interface/chat/users";
import {InfoAboutUser} from "../../interface/chat/infoAboutUser";
import {Message} from "../../interface/chat/message";

describe('ChatService', () => {
  let injector: TestBed;
  let service: ChatService;
  let httpMock: HttpTestingController;
  const bathPath = 'https://studentschat.herokuapp.com';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChatService]
    });

    injector = getTestBed();
    service = injector.get(ChatService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });

  it('getMembers() should return members', () => {
    const dummyMembers = [
      {
        "user_id": "1122962595",
        "username": "andreyyaz",
        "password": "1234",
        "status": "active",
        "gender": "male",
        "about": "Description",
        "phone": "6754545475",
        "country": "Украина",
        "mail": "dfhfgfdh@bgjvgf",
        "avatarId": "01",
        "chatroom_id": "103143811-1122962595"
      },
      {
        "user_id": "1238261095",
        "username": "Test User",
        "password": "1234",
        "status": "inactive",
        "gender": "male",
        "about": "Description 2",
        "phone": "6754545475",
        "country": "Украина",
        "mail": "dfhfgfdh@bgjvgf",
        "avatarId": "02"
      },
      {
        "user_id": "537818528",
        "username": "Inactive User",
        "password": "1234",
        "status": "inactive",
        "gender": "male",
        "mail": "dfhfgfdh@bgjvgf",
        "avatarId": "03"
      },
    ];
    service.getMembers().subscribe((res: User[]) => {
      expect(res).toEqual(dummyMembers);
    });

    const request = httpMock.expectOne(`https://studentschat.herokuapp.com/users/`,);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMembers);
  });

  it('getInfo() should return info', () => {
    const dummyUserInfo = {
      user_id: "1122962595",
      username: "andreyyaz",
      status: "active",
      gender: "male",
      about: "Description",
      phone: 6754545475,
      country: "Украина",
      mail: "dfhfgfdh@bgjvgf",
      avatarId: "01",
      chatroom_id: "103143811-1122962595"
    };
    service.user.username = 'andreyyaz';
    service.getInfo().subscribe((res: InfoAboutUser) => {
      expect(res).toEqual(dummyUserInfo);
    });

    const request = httpMock.expectOne(`${bathPath}/users/info?username=${service.user.username}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyUserInfo);
  });

  it('getChats() should return chat rooms by username', () => {
    service.user.username = 'andreyyaz';
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
    service.getChats().subscribe((res: User) => {
      expect(res).toEqual(dummyChats);
    });

    const request = httpMock.expectOne(`${bathPath}/chatroom?username=${service.user.username}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyChats);
  });

  it('getMessages() should return messages by room id', () => {
    const id = 'MAIN';
    const dummyMessages: Message[] = [
      {
        username: "andreyyaz",
        message: "Test message 1",
        chatroom_id: "MAIN",
        datetime: "2019-06-28T00:16:12.343Z"
      },
      {
        username: "andreyyaz",
        message: "Test message 2",
        chatroom_id: "MAIN",
        datetime: "2019-06-28T00:18:57.669Z"
      }
    ];
    service.getMessages(id).subscribe((res: Message[]) => {
      expect(res).toEqual(dummyMessages);
    });

    const request = httpMock.expectOne(`${bathPath}/messages?chatroom_id=${id}`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyMessages);
  });

  it('postInfo() should return info on post request', () => {
    const postRequest = {
      about: "Descripti22on",
      avatarId: "01",
      country: "Украина",
      gender: "male",
      mail: "dfhfgfdh@bgjvgf",
      phone: 6754545475,
      username: "andreyyaz"
    };

    const postInfo = {
      about: "Descripti22on",
      avatarId: "01",
      chatroom_id: "103143811-1122962595",
      country: "Украина",
      gender: "male",
      mail: "dfhfgfdh@bgjvgf",
      phone: 6754545475,
      status: "active",
      user_id: 1122962595,
      username: "andreyyaz"
    };

    service.postInfo(postRequest).subscribe((res: InfoAboutUser) => {
      expect(res).toEqual(postInfo);
    });

    const request = httpMock.expectOne(`${bathPath}/users/info`);
    expect(request.request.method).toBe('POST');
    request.flush(postInfo);
  });
});
