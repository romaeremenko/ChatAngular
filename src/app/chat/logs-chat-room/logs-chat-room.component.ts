import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-logs-chat-room',
  templateUrl: './logs-chat-room.component.html',
  styleUrls: ['./logs-chat-room.component.css']
})
export class LogsChatRoomComponent implements OnInit {


  titleStyle = `containerName marginName name sairaRegular18`;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
        this.setActive(routeParams.id);
      });
  }

  setActive(id) {
    const active = document.getElementsByClassName('alignLeft chatRoom');
    Array.from(active).forEach( (el: HTMLElement) => {
      if (id === el.innerText) {
        el.className = 'alignLeft chatRoom active';
      } else {
        el.className = 'alignLeft chatRoom';
      }
    });
  }

}
