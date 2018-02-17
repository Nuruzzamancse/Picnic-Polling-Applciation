import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  templateUrl: './admin-login.component.html',
  styleUrls: [
    './admin-login.component.css'
  ]
})
export class AdminLoginComponent implements OnInit {

  adminEmail = new FormControl('', [Validators.required, Validators.email]);
  adminPassword = new FormControl('', [Validators.required]);

  adminLoginForm: FormGroup = this.fb.group({
    adminEmail: this.adminEmail,
    adminPassword: this.adminPassword
  });

  constructor(private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {}

  loginAdmin(formData) {
    console.log(formData);
  }
}
