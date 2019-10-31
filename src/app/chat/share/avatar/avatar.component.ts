import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input() avatar: string;

  constructor() {
  }

  ngOnInit() {
  }

  get getUserAvatar() {
    if (!!this.avatar) {
      return 'url(/assets/' + this.avatar + '.svg)';
    }
  }

}
