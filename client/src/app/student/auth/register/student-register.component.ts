import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Student} from "../../student";
import {StudentService} from "../../student.service";

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

  student: Student;

  constructor(private formBuilder: FormBuilder,
              private studentService: StudentService) {}
  ngOnInit() {
    this.studentRegistrationForm = this.formBuilder.group({
      studentName: this.studentName,
      studentRoll: this.studentRoll,
      studentEmail: this.studentEmail,
      studentPasswordGroup: this.formBuilder.group({
        studentPassword: this.studentPassword,
        studentRetypePassword: this.studentRetypePassword
      }, {
        validator: comparePassword
      })
    });
  }

  registerStudent(formData) {
    console.log(formData);
    this.student = new Student();
    this.student.studentName = formData.studentName;
    this.student.studentRoll = formData.studentRoll;
    this.student.studentEmail = formData.studentEmail;
    this.student.studentPassword = formData.studentPasswordGroup.studentPassword;
    this.studentService.createStudent(this.student).subscribe((data) => {
      console.log(data);
    });
  }


}
