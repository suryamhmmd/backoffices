import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  auth: any;
  constructor() {}

  ngOnInit(): void {
    this.auth = localStorage.getItem('user');
  }
}
