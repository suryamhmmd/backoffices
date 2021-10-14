import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userFormGroup: FormGroup;
  auth: any;
  submitted = false;
  granted = false;

  constructor(private readonly router: Router) {}

  ngOnInit() {
    this.userFormGroup = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    this.submitted = true;
    if (
      this.userFormGroup.value.username === 'admin' &&
      this.userFormGroup.value.password === 'admin'
    ) {
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      });
      console.log(this.userFormGroup.value);
      this.auth = {
        username: this.userFormGroup.value.username,
        password: this.userFormGroup.value.password,
      };
      this.granted = true;
      localStorage.setItem('user', JSON.stringify(this.auth));
    } else {
      this.granted = false;
      this.router.navigate(['/login']);
      console.log('Username atau Password salah!');
    }
  }
}
