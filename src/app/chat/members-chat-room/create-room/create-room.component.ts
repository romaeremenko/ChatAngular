import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  @Input() title: string;
  @Output() submitForm = new EventEmitter<string>();
  @Output() exit = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  submitTitle() {
    if (this.title === '') {
      alert('Строка пуста');
    } else {
      this.submitForm.emit(this.title);
    }
  }

  exitForm(): void {
    this.exit.emit();
  }
}
