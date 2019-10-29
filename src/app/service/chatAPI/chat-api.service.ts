import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {User} from '../../interface/chat/users';
import {UserResponce} from '../../interface/server/userResponce';
import {Message} from '../../interface/chat/message';
import {ChatroomsResponce} from '../../interface/server/chatroomsResponce';
import {Chatroom} from '../../interface/chat/chatroom';

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
  private chatRoomsGet = 'https://studentschat.herokuapp.com/chatroom?username='
  private loginUrl = 'https://studentschat.herokuapp.com/users/login';
  private regUrl = 'https://studentschat.herokuapp.com/users/register';
  private chatMessagesPost = 'https://studentschat.herokuapp.com/messages';
  private chatRoomPost = 'https://studentschat.herokuapp.com/chatroom';
  private informationPost = 'https://studentschat.herokuapp.com/users/info';
  private logoutUrl = 'https://studentschat.herokuapp.com/users/logout';
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
    return this.http.post(this.loginUrl, {username: loginField, password: passwordField}).pipe(map(mf => mf[0]));
  }

  logout(id, name): Observable<object> {
    console.log(id, name);
    return this.http.post(this.logoutUrl, {username: this.user.username, chatroom_id: id, chatroom_name: name});
  }

  sendMessage(inputMessage: string): Observable<object> {
    console.log(this.currentRoom);

    const postRequest: Message = {
      datetime: new Date().toISOString(),
      message: inputMessage,
      username: this.user.username,
    };

    if (this.currentRoom !== 'MAIN') {
      postRequest.chatroom_id = this.currentRoom;
    }

    return this.http.post(this.chatMessagesPost, postRequest);
  }

  createChatRoom(inviteUserId: string, chatName: string): Observable<object> {
    console.log(this.user.username, inviteUserId, chatName);

    const postRequest: Chatroom = {
      owner: this.user.username,
      invitees: inviteUserId,
      name: chatName
    };

    return this.http.post(this.chatRoomPost, postRequest);
  }

  postInfo(postRequest) {
    console.log(postRequest);
    // return this.http.post(this.informationPost, postRequest);
  }

  getMembers(): Observable<any> {
    return this.chatUsers;
  }

  getMessages(id): Observable<any> {
    this.currentRoom = id;
    return this.http.get<Message[]>(this.chatMessagesGet + id);
  }

  getChats(username) {
    return this.http.get<ChatroomsResponce>(this.chatRoomsGet + this.user.username);
  }

  registration(loginField: string, passwordField: string): Observable<any> {
    return this.http.post(this.regUrl, {username: loginField, password: passwordField});
  }

}
