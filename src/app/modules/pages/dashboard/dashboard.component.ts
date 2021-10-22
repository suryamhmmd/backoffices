import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faEdit,
  faInfo,
  faPlus,
  faSort,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Employee } from 'src/app/data/employee';
import { MockService } from 'src/app/data/mock.service';
import { DialogComponent } from '../dialog/dialog.component';

export interface DialogData {
  button: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public page = 1;
  public pageSize = 7;

  faPlus = faPlus;
  faEdit = faEdit;
  faDelete = faTrash;
  faInfo = faInfo;
  faSort = faSort;

  auth: any;
  newDataEmployee: any;

  employeeList: Employee[];
  newEmployeeList: any[];

  searchKey: any;
  value: any[];
  filter = new FormControl('');

  addUser = '';
  username: string;
  clickedRows = new Set<any>();
  constructor(
    private readonly mockService: MockService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.searchKey = localStorage.getItem('searchKey');
    this.username = this.route.snapshot.params['username'];

    this.auth = localStorage.getItem('user');
    this.addUser = JSON.parse(localStorage.getItem('addUser') || 'false');
    console.log('addUser', this.addUser);
    this.newDataEmployee = JSON.parse(
      localStorage.getItem('employeeList') || '{}'
    );
    console.log('new:', this.newDataEmployee);
    if (this.addUser) {
      console.log('true');
      this.mockService.getEmployeeList().subscribe(
        (res: Employee[]) => {
          this.employeeList = res;
          this.newDataEmployee.forEach((element: Employee) => {
            this.employeeList.unshift(element);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else if (!this.addUser) {
      console.log('false');
      this.mockService.getEmployeeList().subscribe((res) => {
        this.employeeList = res;
      });
    }
  }

  applyFilter() {
    localStorage.setItem('searchKey', this.searchKey);
  }
  goToAddEmployee() {
    this.router.navigate(['/dashboard/employee/add']);
  }
  goToDetail(data: any) {
    console.log(data);
    localStorage.setItem('detailEmployee', JSON.stringify(data));
  }
  formatRupiah(angka: any) {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('') + ',00';
    return ribuan;
  }

  isDesc: boolean = false;

  sortName(property) {
    this.isDesc = !this.isDesc;

    let direction = this.isDesc ? 1 : -1;

    this.employeeList.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }

  order: any;
  data: any;
  sortNumber() {
    if (this.order) {
      let newArr = this.employeeList.sort(
        (a, b) => a.basicSalary - b.basicSalary
      );
      this.data = newArr;
    } else {
      let newArr = this.employeeList.sort(
        (a, b) => b.basicSalary - a.basicSalary
      );
      this.data = newArr;
    }
    this.order = !this.order;
  }
  open(buttonKlik) {
    if (buttonKlik === 'edit') {
      const modalRef = this.modalService.open(DialogComponent);
      modalRef.componentInstance.name = 'EDIT BUTTON';
    } else if (buttonKlik === 'delete') {
      const modalRef = this.modalService.open(DialogComponent);
      modalRef.componentInstance.name = 'DELETE BUTTON';
    }
  }
}
