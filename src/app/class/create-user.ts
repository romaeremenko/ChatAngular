export class CreateUser {
  public chats;

  constructor(public user_id, public username, public avatarId) {
    this.user_id = user_id;
    this.username = username;
    this.avatarId = avatarId;
  }

  set info(resp) {
    this.user_id = resp.user_id;
    this.username = resp.username;
    this.avatarId = resp.avatarId;
  }

  get data() {
    return this;
  }
}
