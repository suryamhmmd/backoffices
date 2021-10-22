import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(Employee: Employee[], searchKey: string): Employee[] {
    if (!Employee || !searchKey) {
      return Employee;
    }
    return Employee.filter(
      (employee) =>
        employee.first_name
          .toLocaleLowerCase()
          .includes(searchKey.toLocaleLowerCase()) ||
        employee.last_name
          .toLocaleLowerCase()
          .includes(searchKey.toLocaleLowerCase())
    );
  }
}
