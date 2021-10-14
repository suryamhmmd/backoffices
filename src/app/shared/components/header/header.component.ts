import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  auth: any;
  auth2: any;
  constructor(
    private observer: BreakpointObserver,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.auth = localStorage.getItem('user');
    this.auth2 = JSON.parse(this.auth);
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
