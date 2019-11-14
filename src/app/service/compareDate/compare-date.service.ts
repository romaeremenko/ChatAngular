import {Injectable} from '@angular/core';

@Injectable()
export class CompareDate {
  public previousDate;

  compareDate(currentDate: string): string {
    currentDate = currentDate.substr(0, 10);
    if (currentDate !== this.previousDate) {
      this.previousDate = currentDate;

      return this.previousDate;
    } else {
      return '';
    }
  }
}
