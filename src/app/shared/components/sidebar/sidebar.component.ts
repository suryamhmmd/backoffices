import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { delay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  auth: any;
  auth2: any;

  constructor(
    private observer: BreakpointObserver,
    private readonly router: Router
  ) {}
  ngOnInit() {
    this.auth = localStorage.getItem('user');
    this.auth2 = JSON.parse(this.auth);

    this.ngAfterViewInit();
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }
  goToEmployeeDetail() {
    this.router.navigate(['/dashboard/employee/add']);
  }
  goToEmployeeList() {
    this.router.navigate(['/dashboard/employee/detail']);
  }
  goToAbout() {
    this.router.navigate(['/about']);
  }
}
