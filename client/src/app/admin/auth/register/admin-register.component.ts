import {Component, OnInit} from "@angular/core";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

function comparePassword(c: AbstractControl): {[key: string]: boolean} | null {
  let adminPasswordControl = c.get('adminPassword');
  let adminRetypePasswordControl = c.get('adminRetypePassword');
  if (adminPasswordControl.pristine || adminRetypePasswordControl.pristine) return null;
  if (adminPasswordControl.value === adminRetypePasswordControl.value) return null;
  return { 'mismatchedPassword': true };
}

@Component({
  templateUrl: './admin-register.component.html',
  styleUrls: [
    './admin-register.component.css'
  ]
})
export class AdminRegisterComponent implements OnInit {

  adminRegistrationForm: FormGroup;

  adminUsername = new FormControl('', [Validators.required]);
  adminEmail = new FormControl('', [Validators.required, Validators.email]);
  adminPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
  adminRetypePassword = new FormControl('', [Validators.required]);

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit() {
    this.adminRegistrationForm = this.formBuilder.group({
      adminUsername: this.adminUsername,
      adminEmail: this.adminEmail,
      adminPasswordGroup: this.formBuilder.group({
        adminPassword: this.adminPassword,
        adminRetypePassword: this.adminRetypePassword
      }, {
        validator: comparePassword
      })
    });
  }

  registerAdmin(formData) {
    console.log(formData);
  }
}
