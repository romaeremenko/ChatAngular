import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../interface/chat/users';
import {UserResponce} from '../../interface/server/userResponce';
import {Message} from '../../interface/chat/message';
import {Chatroom} from '../../interface/chat/chatroom';
import {InfoAboutUser} from '../../interface/chat/infoAboutUser';
import {MessageResponce} from '../../interface/server/messageResponce';

@Injectable()
export class ChatService {
  user: User = {
    user_id: '',
    username: '',
    avatarId: '',
    set info(resp: UserResponce) {
      this.user_id = resp.user_id;
      this.username = resp.username;
      this.avatarId = resp.avatarId;
    }
  };
  usersAvatars = {};
  userInfo: InfoAboutUser;
  currentRoom;
  private bathPath = 'https://studentschat.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  sendMessage(inputMessage: string): Observable<MessageResponce> {
    const postRequest: Message = {
      datetime: new Date().toISOString(),
      message: inputMessage,
      username: this.user.username,
    };

    if (this.currentRoom !== 'MAIN') {
      postRequest.chatroom_id = this.currentRoom;
    }

    return this.http.post<MessageResponce>(`${this.bathPath}/messages`, postRequest);
  }

  createChatRoom(invitees: string, name: string): Observable<object> {
    const postRequest: Chatroom = {
      owner: this.user.username,
      invitees,
      name
    };

    return this.http.post(`${this.bathPath}/chatroom`, postRequest);
  }

  postInfo(postRequest: InfoAboutUser): Observable<InfoAboutUser> {
    return this.http.post<InfoAboutUser>(`${this.bathPath}/users/info`, postRequest);
  }

  getInfo(): Observable<InfoAboutUser> {
    return this.http.get<InfoAboutUser>(`${this.bathPath}/users/info?username=${this.user.username}`);
  }

  getMembers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.bathPath}/users/`);
  }

  getMessages(id): Observable<Message[]> {
    this.currentRoom = id;
    return this.http.get<Message[]>(`${this.bathPath}/messages?chatroom_id=${id}`);
  }

  getChats(): Observable<User> {
    if (!this.user.username) {
      return this.http.get<User>(`${this.bathPath}/chatroom?username=_`);
    }
    return this.http.get<User>(`${this.bathPath}/chatroom?username=${this.user.username}`);
  }

  registration(loginField: string, passwordField: string): Observable<UserResponce> {
    return this.http.post<UserResponce>(`${this.bathPath}/users/register`, {username: loginField.trim(), password: passwordField});
  }
}
