import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './student-login.component.html',
  styleUrls: [
    './student-login.component.css'
  ]
})
export class StudentLoginComponent implements OnInit {

  studentEmail = new FormControl('', [Validators.email]);
  studentPassword = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {}

  studentLoginForm: FormGroup = this.formBuilder.group({
    studentEmail: this.studentEmail,
    studentPassword: this.studentPassword
  });

  loginStudent(formData) {
    console.log(formData);
  }
}
