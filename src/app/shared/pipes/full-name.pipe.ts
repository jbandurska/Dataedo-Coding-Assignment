import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../people/models/user.model';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform(user: User): string {
    return `${user.name.first} ${user.name.last}`;
  }
}
