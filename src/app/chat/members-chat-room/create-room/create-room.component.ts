import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent {
  @Input() title: string;
  @Output() submitForm = new EventEmitter<string>();
  @Output() exit = new EventEmitter<void>();

  submitTitle(): void {
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
