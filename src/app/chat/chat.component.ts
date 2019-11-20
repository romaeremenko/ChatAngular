import { Component, ViewEncapsulation } from '@angular/core';
import { ShowTabsService } from '../service/showTabs/show-tabs.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChatComponent {
  constructor(public showTabsService: ShowTabsService) {}
}
