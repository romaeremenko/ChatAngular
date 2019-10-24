import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
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
  private chatMessagesGet = 'https://studentschat.herokuapp.com/messages?chatroom_id=';
  private loginUrl = 'https://studentschat.herokuapp.com/users/login';
  private regUrl = 'https://studentschat.herokuapp.com/users/register';
  private chatMessagesPost = 'https://studentschat.herokuapp.com/messages';
  private currentRoom;

  // Добавил запрос для логина /users/login
  // формат запроса
  // {
  //    username: inputMessage
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

  sendMessage(inputMessage: string): Observable<object> {
    console.log(this.currentRoom);
    return this.http.post(this.chatMessagesPost, {
      datetime: new Date().toISOString(),
      message: inputMessage,
      username: this.user.username,
      // chatroom_id: this.currentRoom
    });
  }

  getMembers(): Observable<any> {
    return this.chatUsers;
  }

  getMessages(id): Observable<any> {
    this.currentRoom = id;
    return this.http.get<Message[]>(this.chatMessagesGet + id);
  }

  registration(loginField: string, passwordField: string): Observable<any> {
    return this.http.post(this.regUrl, {username: loginField, password: passwordField}).pipe(
      catchError(err => of(false))
    );
  }

}
