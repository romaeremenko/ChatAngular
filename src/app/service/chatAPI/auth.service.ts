import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResponce } from '../../interface/server/userResponce';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {
  private bathPath = 'https://studentschat.herokuapp.com';

  constructor(private http: HttpClient) {}

  isExist(
    username: string,
    password: string
  ): Observable<UserResponce> | Observable<object> {
    return this.http
      .post(`${this.bathPath}/users/login`, { username, password })
      .pipe(map(user => user[0]));
  }

  logout(
    username: string,
    idRoom: string,
    roomName: string
  ): Observable<object> {
    return this.http.post(`${this.bathPath}/users/logout`, {
      username,
      chatroom_id: idRoom,
      chatroom_name: roomName
    });
  }

  registration(
    loginField: string,
    passwordField: string
  ): Observable<UserResponce> {
    return this.http.post<UserResponce>(
      `${this.bathPath}/users/register`,
      { username: loginField.trim(), password: passwordField }
    );
  }
}
