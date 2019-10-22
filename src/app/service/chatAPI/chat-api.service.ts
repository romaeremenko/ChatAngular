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

  // порядок:
  // public
  // private
  // constructor
  // public
  // private

  user: User = {
    user_id: '',
    username: ''
  };
  private chatUsers = this.http.get<User[]>('https://studentschat.herokuapp.com/users/');
  private chatMessages = this.http.get<Message[]> ('https://studentschat.herokuapp.com/messages/');
  private loginUrl = 'https://studentschat.herokuapp.com/users/login';
  private regUrl = 'https://studentschat.herokuapp.com/users/register';

  // Добавил запрос для логина /users/login
  // формат запроса
  // {
  //    username: string
  // }
  //
  // формат  успешного ответа
  //
  // {
  //    status: "ok"
  // }
  //

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
