import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  public previousDate;

  // compareDate(currentDate: string) {
  //   console.log(new Date(currentDate));
  //   currentDate = currentDate.substr(0, 10).replace(/-/g, '');
  //
  //   if (+currentDate > this.previousDate) {
  //
  //     this.previousDate = +currentDate;
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  compareDate(currentDate: string) {
    currentDate = currentDate.substr(0, 10);

    if (currentDate !== this.previousDate) {
      this.previousDate = currentDate;
      return currentDate;
    } else {
      return '';
    }
  }
}
