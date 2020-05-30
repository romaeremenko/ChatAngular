import {getTestBed, TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {UserResponce} from "../../interface/server/userResponce";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

fdescribe('AuthorizationUserService', () => {
  let httpMock: HttpTestingController;
  let injector: TestBed;
  let service: AuthService;
  const bathPath = 'https://studentschat.herokuapp.com';
  const resp: UserResponce[] = [{
    user_id: "1122962595",
    username: "andreyyaz",
    status: "active",
    gender: "male",
    about: "Description",
    phone: 6754545475,
    country: "Украина",
    mail: "dfhfgfdh@bgjvgf",
    avatarId: "01",
    chatroom_id: "103143811-1122962595",
    chatroom_name: "Test Chat2"
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('authorization user', () => {
    service.isExist('andreyyaz','1234').subscribe((responce)=>{
      expect(responce).toEqual(resp)
    });

    const request = httpMock.expectOne(`${bathPath}/users/login`);
    expect(request.request.method).toBe('POST');
    request.flush(resp);
  });

  it('wrong username', () => {
    const error =   {status:"fail",message:"Пользователь не зарегистрирован"};
    service.isExist('andreYYyaz','1234').subscribe((responce)=>{
      expect(responce).toEqual(error)
    });

    const request = httpMock.expectOne(`${bathPath}/users/login`);
    expect(request.request.method).toBe('POST');
    request.flush(error);
  });

  it('wrong password', () => {
    const error =   {status:"fail",message:"пароля"};
    service.isExist('andreyyaz','01234').subscribe((responce)=>{
      expect(responce).toEqual(error)
    });

    const request = httpMock.expectOne(`${bathPath}/users/login`);
    expect(request.request.method).toBe('POST');
    request.flush(error);
  });

});
