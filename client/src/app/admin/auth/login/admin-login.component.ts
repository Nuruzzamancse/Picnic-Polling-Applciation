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

  adminUsername = new FormControl('', [Validators.required]);
  adminPassword = new FormControl('', [Validators.required]);

  adminLoginForm: FormGroup = this.fb.group({
    adminUsername: this.adminUsername,
    adminPassword: this.adminPassword
  });

  constructor(private fb: FormBuilder,
              private router: Router) {}

  ngOnInit() {}

  loginAdmin(formData) {
    console.log(formData);
  }
}
