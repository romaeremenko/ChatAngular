import { Component, HostListener, OnInit } from '@angular/core';
import { ChatService } from '../../../service/chatAPI/chat.service';
import { InputMessageService } from '../../../service/inputMessage/input-message.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-input-message',
  templateUrl: './input-message.component.html',
  styleUrls: ['./input-message.component.css']
})
export class InputMessageComponent implements OnInit {
  bold = { startTag: '<strong>', endTag: '</strong>' };
  italic = { startTag: '<i>', endTag: '</i>' };
  underline = { startTag: '<u>', endTag: '</u>' };
  inputMessage: string;

  @HostListener('document:keydown', ['$event'])
  handleKeydownEvent(event: KeyboardEvent) {
    this.stringService.checkLength(this.inputMessage, event);
  }

  @HostListener('document:keyup')
  handleKeyupEvent() {
    this.stringService.updateStringInfo(this.inputMessage);
  }

  constructor(
    private chatAPIService: ChatService,
    private stringService: InputMessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.inputMessage = null;
      this.stringService.reset();
    });
  }

  sendMessage(): void {
    if (!!this.inputMessage.trim()) {
      this.chatAPIService
        .sendMessage(this.inputMessage)
        .pipe(
          tap(() => {
            this.stringService.reset();
            this.inputMessage = null;
          })
        )
        .subscribe();
    }
  }

  applyStyle(tag): void {
    if (
      this.stringService.selection.start !==
      this.stringService.selection.end
    ) {
      this.inputMessage = this.stringService.convert(
        this.inputMessage,
        tag
      );
    }
  }
}
