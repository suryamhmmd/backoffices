import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
  readonly DELIMITER = '/';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : null;
  }
}

@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year
      : '';
  }
}

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
  providers: [
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter },
  ],
})
export class AddEmployeeComponent implements OnInit {
  faCalendar = faCalendar;
  form: FormGroup;
  model1: string;
  model2: string;
  username: string;
  loading = false;
  submitted = false;
  maxDate: any;
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
  dynamicId: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ngbCalendar: NgbCalendar,
    private dateAdapter: NgbDateAdapter<string>
  ) {}

  ngOnInit() {
    this.maxDate = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDay() + 17,
    };
    console.log(this.maxDate);

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
    console.log(this.newEmployee);
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
