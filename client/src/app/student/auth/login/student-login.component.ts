import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "../../../common/toastr.service";
import {StudentService} from "../../student.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../common/auth.service";

@Component({
  templateUrl: './student-login.component.html',
  styleUrls: [
    './student-login.component.css'
  ]
})
export class StudentLoginComponent implements OnInit {

  studentEmail = new FormControl('', [Validators.email]);
  studentPassword = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private studentService: StudentService,
              private authService: AuthService,
              private router: Router) {}
  ngOnInit() {}

  studentLoginForm: FormGroup = this.formBuilder.group({
    studentEmail: this.studentEmail,
    studentPassword: this.studentPassword
  });

  loginStudent(formData) {
    console.log(formData);
    this.authService.studentLogin(formData)
      .subscribe((data) => {
        console.log(data);
        if (data.success) {
          this.toastrService.success("Successfully logged in as student.");
          this.router.navigate(['student-dashboard']);
        } else {
          if (data.message) {
            this.toastrService.warning(data.message);
          } else {
            this.toastrService.error('Error in logged in as student');
          }
        }
      });
  }
}
