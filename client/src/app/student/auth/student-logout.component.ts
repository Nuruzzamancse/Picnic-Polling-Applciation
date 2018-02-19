import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../common/auth.service";
import {ToastrService} from "../../common/toastr.service";
import {Router} from "@angular/router";

@Component({
  template: ``,
})
export class StudentLogoutComponent implements OnInit {
  constructor(private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router) {}
  ngOnInit() {
    this.authService.studentLogout();
    this.toastrService.info('Successfully log out as student.');
    this.router.navigate(['student-login']);
  }
}
