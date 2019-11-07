import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputMessageService {
  public punctuationMarksAmount: number;
  public spacesAmount: number;
  public lettersAmount: number;
  public symbolsAmount: number;
  public selection = {
    start: 0,
    end: 0,
  }

  private isConsistent(input: string, event): boolean {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Backspace' || input === null) {
      return false;
    } else if (input !== undefined) {
      return input.replace(/<[^>]+>/gm, '').length >= 500;
    }
  }

  checkLength(input: string, event: KeyboardEvent): void {
    if (this.isConsistent(input, event)) {
      event.returnValue = false;
      event.preventDefault();
    }
  }

  updateStringInfo(input: string): void {
    if (!input) {
      this.reset();
      return;
    }
    const numbersAmount = input.length - input.replace(/[0-9]/g, '').length;
    input = input.replace(/<[^>]+>/gm, '');
    this.punctuationMarksAmount = input.length - input.replace(/[.,+@\/#!$%\^&\*"'`;?:{}=\-_`~()]/g, '').length;
    this.spacesAmount = input.length - input.replace(/\s+/g, '').length;
    this.lettersAmount = input.length - this.spacesAmount - this.punctuationMarksAmount - numbersAmount;
    this.symbolsAmount = input.length;
  }

  selectionChange(ev: any): void {
    this.selection.start = ev.target.selectionStart;
    this.selection.end = ev.target.selectionEnd;
  }

  convert(input: string, {startTag, endTag},
          start: number = this.selection.start,
          end: number = this.selection.end): string {
    return input.substring(0, start) + startTag + input.substring(start, end) + endTag + input.substring(end);
  }

  reset(): void {
    this.punctuationMarksAmount = 0;
    this.spacesAmount = 0;
    this.lettersAmount = 0;
    this.symbolsAmount = 0;
  }

  private isConsistent(input: string, event: KeyboardEvent): boolean | string {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'Backspace' || input === null) {
      return false;
    } else if (!!input) {
      return input.replace(/<[^>]+>/gm, '').length >= 500;
    }
  }
}
