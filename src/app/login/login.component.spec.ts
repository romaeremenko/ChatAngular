import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {AuthorizationUserService} from "../service/auth/authorization-user.service";
import {FormsModule} from "@angular/forms";
import {mock} from "ts-mockito";
import {Router} from "@angular/router";
import {ChatService} from "../service/chatAPI/chat.service";
import {AuthService} from "../service/chatAPI/auth.service";
import {RedirectToChatService} from "../service/auth/redirect-to-chat.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const ChatServiceMock = mock<ChatService>(ChatService);
  const AuthServiceMock = mock<AuthService>(AuthService);
  const RouterMock = mock<Router>(Router);
  const LocationMock = mock<Location>(Location);
  const RedirectToChatServiceMock = mock<RedirectToChatService>(RedirectToChatService);
  const AuthorizationUserServiceMock = mock<AuthorizationUserService>(AuthorizationUserService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule,
        RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
        {provide: AuthService, useFactory:()=> AuthServiceMock},
        {provide: Location, useFactory: ()=> LocationMock},
        {provide: Router, useFactory: ()=> RouterMock},
        {provide:RedirectToChatService, useFactory:()=>RedirectToChatServiceMock},
        {provide:AuthService, useFactory:()=>AuthServiceMock},
        {provide:Router, useFactory:()=>{}},
        { provide: AuthorizationUserService, useFactory: () => {
          return AuthorizationUserServiceMock } },
        {provide:ChatService, useFactory:()=>{
          return ChatServiceMock;
          }}]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('authorization', () => {
    spyOn(AuthorizationUserServiceMock, 'login').and.returnValue(component.user.loginField === 'andreyyaz');
    expect(AuthorizationUserServiceMock.login(component.user)).toBeTruthy();
  });
});
