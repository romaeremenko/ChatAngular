import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../../interface/chat/users';
import {UserResponce} from '../../interface/server/userResponce';
import {Message} from '../../interface/chat/message';
import {ChatroomsResponce} from '../../interface/server/chatroomsResponce';
import {Chatroom} from '../../interface/chat/chatroom';
import {Info} from '../../interface/chat/info';

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
    username: '',
    avatarId: ''
  };
  usersAvatars = {};
  userInfo: Info;


  private bathPath = 'https://studentschat.herokuapp.com';
  public currentRoom;

  constructor(private http: HttpClient) {
  }

  isExist(loginField: string, passwordField: string): Observable<UserResponce> | Observable<object> {
    return this.http.post(`${this.bathPath}/users/login`, {username: loginField, password: passwordField}).pipe(map(mf => mf[0]));
  }

  logout(id, name): Observable<object> {
    return this.http.post(`${this.bathPath}/users/logout`, {username: this.user.username, chatroom_id: id, chatroom_name: name});
  }

  sendMessage(inputMessage: string): Observable<object> {
    const postRequest: Message = {
      datetime: new Date().toISOString(),
      message: inputMessage,
      username: this.user.username,
    };

    if (this.currentRoom !== 'MAIN') {
      postRequest.chatroom_id = this.currentRoom;
    }

    return this.http.post(`${this.bathPath}/messages`, postRequest);
  }

  createChatRoom(inviteUserId: string, chatName: string): Observable<object> {
    const postRequest: Chatroom = {
      owner: this.user.username,
      invitees: inviteUserId,
      name: chatName
    };

    return this.http.post(`${this.bathPath}/chatroom`, postRequest);
  }

  postInfo(postRequest: Info) {
    return this.http.post(`${this.bathPath}/users/info`, postRequest);
  }

  getInfo(): Observable<any> {
    return this.http.get<Info>(`${this.bathPath}/users/info?username=${this.user.username}`);
  }

  getMembers(): Observable<any> {
    return this.http.get<User[]>(`${this.bathPath}/users/`);
  }

  getMessages(id): Observable<any> {
    this.currentRoom = id;
    return this.http.get<Message[]>(`${this.bathPath}/messages?chatroom_id=${id}`);
  }

  getChats(username) {
    return this.http.get<ChatroomsResponce>(`${this.bathPath}/chatroom?username=${this.user.username}`);
  }

  registration(loginField: string, passwordField: string): Observable<any> {
    return this.http.post(`${this.bathPath}/users/register`, {username: loginField.trim(), password: passwordField});
  }

}
