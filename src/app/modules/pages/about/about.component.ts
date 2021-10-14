import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  auth: any;
  constructor() {}

  ngOnInit(): void {
    this.auth = localStorage.getItem('user');
  }
}
