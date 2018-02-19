import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../common/auth.service";
import {ToastrService} from "../../../common/toastr.service";

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
              private authService: AuthService,
              private toastrService: ToastrService) {}

  ngOnInit() {}

  loginAdmin(formData) {
    console.log(formData);
    this.authService.adminLogin(formData).subscribe((data) => {
      if (data.success) {
        this.toastrService.success('Successfully logged in as admin.');
        this.router.navigate(['admin-dashboard']);
      } else {
        if (data.message) {
          this.toastrService.warning(data.message);
        } else {
          this.toastrService.error('Error in logged in as Admin');
        }
      }
    });
  }
}
