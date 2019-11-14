import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  @Input() avatar: string;

  get getUserAvatar(): string {
    if (!!this.avatar) {
      return 'url(/assets/' + this.avatar + '.svg)';
    }
  }
}
