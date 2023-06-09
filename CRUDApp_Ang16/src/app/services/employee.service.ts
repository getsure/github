import { Injectable } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const headerOption = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  allEmployee: any = [];
  mockUrl: string = 'http://localhost:3000/Employee';

  constructor(private http: HttpClient) { }
  getAllEmployee() {
    return this.http.get(this.mockUrl)    
  }

  deleteEmployee(id: Number): Observable<Employee> {
    return this.http.delete<Employee>(this.mockUrl + '/' + id, headerOption);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    console.log(employee)
    return this.http.post<Employee>(this.mockUrl, employee, headerOption);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.mockUrl + '/' + employee.id, employee, headerOption);
  }
}
