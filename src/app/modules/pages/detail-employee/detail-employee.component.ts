import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss'],
})
export class DetailEmployeeComponent implements OnInit {
  auth: any;
  detailEmployee: any;
  constructor() {}

  ngOnInit(): void {
    this.auth = localStorage.getItem('user');
    this.detailEmployee = JSON.parse(
      localStorage.getItem('detailEmployee') || '{}'
    );
    console.log(this.detailEmployee);
  }

  formatRupiah(angka: any) {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g),
      splitt = reverse.split(',');
    ribuan = ribuan.join('.').split('').reverse().join('') + ',00';
    return ribuan;
  }
}
