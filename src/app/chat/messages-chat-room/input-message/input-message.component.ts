import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ChatAPIService} from '../../../service/chatAPI/chat-api.service';
import {InputMessageService} from '../../../service/inputMessage/input-message.service';

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.css']
})
export class InputMessageComponent {

  inputMessage: string;
  bold = {startTag: '<strong>', endTag: '</strong>'};
  italic = {startTag: '<i>', endTag: '</i>'};
  underline = {startTag: '<u>', endTag: '</u>'};

  @HostListener('document:keydown', ['$event'])
  handleKeydownEvent(event: KeyboardEvent) {
    this.stringService.checkLength(this.inputMessage, event);
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyupEvent(event: KeyboardEvent) {
    this.stringService.updateStringInfo(this.inputMessage);
  }

  constructor(private chatAPIService: ChatAPIService, private stringService: InputMessageService) {
  }

  sendMessage() {
    if (!!this.inputMessage.trim()) {
      return this.chatAPIService.sendMessage(this.inputMessage).subscribe(_ => {
        this.stringService.reset();
        this.inputMessage = null;
      });
    }
  }

  applyStyle(tag) {
    if (this.stringService.selection.start !== this.stringService.selection.end) {
      this.inputMessage = this.stringService.convert(this.inputMessage, tag);
    }
  }
}
