import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

interface Departements {
  value: string;
  viewValue: string;
}
type MyArray = Array<any>;
const newData: MyArray = [];

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  username: string;
  loading = false;
  submitted = false;
  maxDate = new Date();
  newEmployee: any;
  addUser = '';
  auth: any;

  selectedValue: string;
  selectedCar: string;

  departements: Departements[] = [
    { value: 'dept1', viewValue: 'Dept1' },
    { value: 'dept2', viewValue: 'Dept2' },
    { value: 'dept3', viewValue: 'Dept3' },
    { value: 'dept4', viewValue: 'Dept4' },
    { value: 'dept5', viewValue: 'Dept5' },
    { value: 'dept6', viewValue: 'Dept6' },
    { value: 'dept7', viewValue: 'Dept7' },
    { value: 'dept8', viewValue: 'Dept8' },
    { value: 'dept9', viewValue: 'Dept9' },
    { value: 'dept10', viewValue: 'Dept10' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.auth = localStorage.getItem('user');
    this.username = this.route.snapshot.params['username'];
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      basicSalary: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      birthDate: ['', Validators.required],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    const {
      firstName,
      lastName,
      username,
      email,
      basicSalary,
      birthDate,
      status,
      group,
      description,
    } = this.form.value;
    this.newEmployee = {
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      basicSalary: basicSalary,
      birthDate: birthDate,
      status: status,
      group: group,
      description: description,
    };
    if (this.form.valid) {
      this.addUser = 'true';
      newData.unshift(this.newEmployee);
      localStorage.setItem('addUser', this.addUser);
      localStorage.setItem('employeeList', JSON.stringify(newData));
    } else if (this.form.invalid) {
      // stop here if form is invalid
      return;
    }

    this.loading = true;
    this.router.navigate(['/dashboard']);
  }
}
