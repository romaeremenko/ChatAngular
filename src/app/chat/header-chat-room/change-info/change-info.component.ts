import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ChatAPIService} from '../../../service/chatAPI/chat-api.service';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.css']
})
export class ChangeInfoComponent implements OnInit {
  @Output() submitForm = new EventEmitter<void>();
  @Output() exit = new EventEmitter<void>();
  countries: any = ['Украина', 'Белоруссия', 'Польша', 'Россия', 'Молдова'];
  menAvatars = ['01', '02', '03', '04', '05', '06'];
  womanAvatars = ['07', '08', '09', '10', '11', '12'];
  user = this.chatAPIService.userInfo;
  previousAvatarId;
  previousGender;
  showAvatars = false;
  form: FormGroup;
  avatarId;
  avatars;

  constructor(private chatAPIService: ChatAPIService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      gender: new FormControl(''),
      about: new FormControl(this.user.about),
      phone: new FormControl(this.user.phone, [
        Validators.min(999999),
        Validators.required
      ]),
      country: new FormControl(this.user.country),
      mail: new FormControl(this.user.mail, [
        Validators.email,
        Validators.required
      ]),
    });
    this.previousAvatarId = this.user.avatarId;
    this.previousGender = this.user.gender;
    this.form.get('gender').valueChanges.subscribe(gender => {
      this.setChooseAvatarView(gender);
    });
    if (!!this.user.gender) {
      this.form.get('gender').setValue(this.user.gender);
    }
  }

  submitInfo(): void {
    this.chatAPIService.user.avatarId = this.user.avatarId;
    this.submitForm.emit(Object.assign({}, this.form.value,
      {avatarId: this.user.avatarId, username: this.chatAPIService.user.username}
    ));
  }

  exitForm(): void {
    this.user.avatarId = this.previousAvatarId;
    this.user.gender = this.previousGender;
    this.exit.emit();
  }

  getImage(avatar): string {
    return '/assets/' + avatar + '.svg';
  }

  setActive(id: string): void {
    this.avatarId = id;
    this.user.avatarId = id;
    const active = document.getElementsByClassName('avatars');
    Array.from(active).forEach((el: HTMLElement) => {
      if (el.style.backgroundImage.includes(id)) {
        el.className = 'avatars active';
      } else {
        el.className = 'avatars';
      }
    });
  }

  setChooseAvatarView(gender: string): void {
    this.showAvatars = true;
    this.user.gender = gender;
    if (gender === 'male') {
      this.avatars = this.menAvatars;
    } else if (gender === 'female') {
      this.avatars = this.womanAvatars;
    }
    if (!!this.user.avatarId && this.user.gender === gender) {
      setTimeout(() => {
        this.setActive(this.user.avatarId);
      }, 100);
    }
  }

  get formMail() {
    return this.form.get('mail');
  }

  get formPhone() {
    return this.form.get('phone');
  }
}
