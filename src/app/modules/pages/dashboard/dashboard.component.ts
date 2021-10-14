import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() appearance: MatFormFieldAppearance;
  auth: any;
  newDataEmployee: any;
  listData: MatTableDataSource<any>;
  employeeList: any[] = [];
  newEmployeeList: any[];
  displayedColumns: string[] = [
    'first_name',
    'last_name',
    'email',
    'basicSalary',
    'description',
    'action',
  ];
  searchKey: any;
  value: any[];

  addUser = '';
  username: string;
  clickedRows = new Set<any>();
  constructor(
    private readonly mockService: MockService,
    private route: ActivatedRoute,
    private readonly router: Router,
    public dialog: MatDialog
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
      this.mockService.getEmployeeList().subscribe((res) => {
        this.employeeList = res;
        this.newDataEmployee.forEach((element: { '': any }) => {
          this.employeeList.unshift(element);
        });
        this.listData = new MatTableDataSource(this.employeeList);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      });
    } else if (!this.addUser) {
      console.log('false');
      this.mockService.getEmployeeList().subscribe((res) => {
        this.employeeList = res;
        this.listData = new MatTableDataSource(this.employeeList);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
      });
    }
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLocaleLowerCase();
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
      ribuan = reverse.match(/\d{1,3}/g),
      splitt = reverse.split(',');
    ribuan = ribuan.join('.').split('').reverse().join('') + ',00';
    return ribuan;
  }

  openDialog(buttonKlik: any) {
    if (buttonKlik === 'edit') {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          button: 'edit',
        },
        panelClass: 'mat-edit',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    } else {
      const dialogRef = this.dialog.open(DialogComponent, {
        data: {
          button: 'delete',
        },
        panelClass: 'mat-delete',
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }
}
