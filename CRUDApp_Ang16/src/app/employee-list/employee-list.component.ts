import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  empList: any = [];
  currentEmployee: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    code: '',
    contactNumber: '',
    address: ''
  }
  constructor(private employeeService: EmployeeService) { 
    console.log('constructor...')
    }

  ngOnInit() {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe(res => {
      this.empList = res;
      console.log(this.empList)

    })
    
  }

  createEmployee(currentEmployee: Employee) {
    console.log(currentEmployee)
    if (currentEmployee.id === '') {
      console.log('Create');
      this.employeeService.createEmployee(currentEmployee).subscribe(
        (data) => {
          this.getAllEmployee();
        });
    } else {
      console.log('Update');
      this.employeeService.updateEmployee(currentEmployee).subscribe(
        (data) => {
          this.getAllEmployee(); //refresh teh data
        });
    }
  }

  editEmployee(employee: Employee) {
    this.currentEmployee = Object.assign({}, employee);
    //this.employeeService.currentEmployee = {...employee};
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(
      (data) => {
        this.getAllEmployee();
      });
  }

  clearEmployee(currentEmployee: Employee) {
    this.currentEmployee = {
      id: '',
      firstName: '',
      lastName: '',
      code: '',
      contactNumber: '',
      address: ''
    }
  }
}
