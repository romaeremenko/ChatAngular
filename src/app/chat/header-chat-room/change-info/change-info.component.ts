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
  form: FormGroup;
  showAvatars = false;
  avatarId;
  avatars;

  constructor(private chatAPIService: ChatAPIService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      gender: new FormControl(''),
      about: new FormControl(''),
      phone: new FormControl('', [
        Validators.min(999999),
        Validators.required
      ]),
      country: new FormControl(''),
      mail: new FormControl('', [
        Validators.email,
        Validators.required
      ]),
    });
    this.form.get('gender').valueChanges.subscribe(gender => {
      this.showAvatars = true;
      if (gender === 'male') {
        this.avatars = this.menAvatars;
      } else {
        this.avatars = this.womanAvatars;
      }
    });
  }

  submitInfo() {
    this.submitForm.emit(Object.assign({}, this.form.value, {avatarId: this.avatarId, username: this.chatAPIService.user.username}));
  }

  exitForm(): void {
    this.exit.emit();
  }

  get formMail(): any {
    return this.form.get('mail');
  }

  get formPhone(): any {
    return this.form.get('phone');
  }

  getImage(avatar) {
    return '/assets/' + avatar + '.svg';
  }

  setActive(id) {
    this.avatarId = id;
    const active = document.getElementsByClassName('avatars');
    Array.from(active).forEach((el: HTMLElement) => {
      // console.log(el.style.backgroundImage.includes(id));
      if (el.style.backgroundImage.includes(id)) {
        el.className = 'avatars active';
      } else {
        el.className = 'avatars';
      }
    });
  }
}
