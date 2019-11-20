import { Pipe, PipeTransform } from '@angular/core';
import { Member } from '../interface/chat/member';

@Pipe({
  name: 'sortByStatus'
})
export class SortByStatusPipe implements PipeTransform {
  transform(members: Member[]): Member[] {
    return members.sort((a, b) => (a.status < b.status ? 1 : -1));
  }
}
