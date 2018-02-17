import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

function comparePassword(c: AbstractControl): {[key: string]: boolean} | null {
  let studentPasswordControl = c.get('studentPassword');
  let studentRetypePasswordControl = c.get('studentRetypePassword');
  if (studentPasswordControl.pristine || studentRetypePasswordControl.pristine) return null;
  if (studentPasswordControl.value === studentRetypePasswordControl.value) return null;
  return { 'mismatchedPassword': true };
}

@Component({
  templateUrl: './student-register.component.html',
  styleUrls: [
    './student-register.component.css'
  ]
})
export class StudentRegisterComponent implements OnInit {

  studentRegistrationForm: FormGroup;

  studentName = new FormControl('', [Validators.required]);
  studentRoll = new FormControl('', [Validators.required]);
  studentEmail = new FormControl('', [Validators.required, Validators.email]);
  studentPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  studentRetypePassword = new FormControl('', [Validators.required]);

  constructor(private  formBuilder: FormBuilder) {}
  ngOnInit() {
    this.studentRegistrationForm = this.formBuilder.group({
      studentName: this.studentName,
      studentRoll: this.studentRoll,
      studentEmail: this.studentEmail,
      studentPasswordGroup: this.formBuilder.group({
        studentPassword: this.studentPassword,
        studentRetypePassword: this.studentRetypePassword
      }, {
        valida: comparePassword
      })
    });
  }

  registerStudent(formData) {
    console.log(formData);
  }


}
