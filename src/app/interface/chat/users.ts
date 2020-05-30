import { Chatroom } from './chatroom';

export interface User {
  user_id?: string;
  username?: string;
  avatarId?: string;
  password?: string;
  status?: string;
  info?: any;
  chats?: Chatroom[];
}
