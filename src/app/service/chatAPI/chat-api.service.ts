import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, filter, map, switchMap} from 'rxjs/operators';
import {User} from '../../interface/chat/users';
import {UserResponce} from '../../interface/server/userResponce';
import {Message} from '../../interface/chat/message';

@Injectable({
  providedIn: 'root'
})
export class ChatAPIService {

  private chat = this.http.get<User[]>('https://studentschat.herokuapp.com/users/');

  user: User;

  private includeName(resp: User[], loginField: string): boolean {
    resp = resp.filter((member: User) => member.username === loginField);
    if (resp.length) {
      this.user = resp[0];
    }
    return !!resp.length;
  }

  constructor(private http: HttpClient) {
  }

  isExist(loginField: string, passwordField: string): Observable<UserResponce> | Observable<object> {
    return this.http.post(this.loginUrl, {username: loginField, password: passwordField});
  }

  getMembers(): Observable<any> {
    return this.chatUsers;
  }

  getMessages(): Observable<any> {
    return this.chatMessages;
  }

  registration(loginField: string, passwordField: string): Observable<any> {
    return this.http.post(this.regUrl, {username: loginField, password: passwordField}).pipe(
      catchError(err => of(false))
    );
  }

}
