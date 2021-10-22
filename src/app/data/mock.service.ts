import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor(private readonly http: HttpClient) {}

  public getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>('/assets/employee.json');
  }
}
