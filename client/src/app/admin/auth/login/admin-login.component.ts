import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../common/auth.service";

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
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {}

  loginAdmin(formData) {
    console.log(formData);
    this.authService.adminLogin(formData).subscribe((data) => {
      console.log(data);
    });
  }
}
