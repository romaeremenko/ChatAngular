import {
  async,
  ComponentFixture, inject,
  TestBed
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {AuthorizationUserService} from "../service/auth/authorization-user.service";
import {FormsModule} from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule],
      declarations: [LoginComponent],
      providers: [AuthorizationUserService
        ]
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
    // component.user.loginField = 'ddd';
    expect(component.login()).toEqual(true);
  });
});
