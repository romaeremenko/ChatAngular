import {
  async,
  ComponentFixture, fakeAsync,
  TestBed, tick
} from '@angular/core/testing';

import { ChangeInfoComponent } from './change-info.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatService} from "../../../service/chatAPI/chat.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {instance, mock, when} from "ts-mockito";
import {By} from "@angular/platform-browser";
import {CreateUser} from "../../../class/create-user";

describe('ChangeInfoComponent', () => {
  let component: ChangeInfoComponent;
  let fixture: ComponentFixture<ChangeInfoComponent>;
  const ChatServiceMock = mock<ChatService>(ChatService);
  let el;
  let userInfo = {
    about: "Description",
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
  let user = {
    user_id: 1122962595,
    username: "andreyyaz",
    avatarId: '01'
  };
  ChatServiceMock.user = new CreateUser(user.user_id,user.username,user.avatarId);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeInfoComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ChatService, useFactory: () => {
            return ChatServiceMock } }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeInfoComponent);
    component =fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change avatar block on choosing female gender', () => {
    component.form.controls['gender'].setValue('female');
    expect(component.avatars).toBe( component.womanAvatars);
  });

  it('change avatar block on choosing male gender', () => {
    component.form.controls['gender'].setValue('male');
    expect(component.avatars).toBe( component.menAvatars);
  });

  it('send the form', () => {
    spyOn(component.submitForm, 'emit');
    component.user.avatarId = '03';
    let obj = {gender: '', about: null, phone: null, country: null, mail: null, avatarId: component.user.avatarId, username: ChatServiceMock.user.username};
    el = fixture.debugElement.query(By.css('form'));
    el.triggerEventHandler('submit', null);
    expect(ChatServiceMock.user.avatarId).toEqual('03');
    expect(component.submitForm.emit).toHaveBeenCalledWith(obj);
  });

  it('send the form when all required fields have not been filled', () => {
    component.form.controls['phone'].setValue('');
    fixture.detectChanges();
    el = fixture.debugElement.query(By.css('input[type="submit"]'));
    expect(el.properties.disabled).toBeTruthy();
  });
});
