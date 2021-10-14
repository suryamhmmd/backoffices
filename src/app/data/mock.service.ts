import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MockService {
  constructor(private readonly http: HttpClient) {}

  public getEmployeeList() {
    return this.http.get<any>('/assets/employee.json');
  }
}
