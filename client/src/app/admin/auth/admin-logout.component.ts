import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../common/auth.service";
import {ToastrService} from "../../common/toastr.service";
import {Router} from "@angular/router";

@Component({
  template: ``
})
export class AdminLogoutComponent implements OnInit {
  constructor(private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router) {}
  ngOnInit() {
    this.authService.adminLogout();
    this.toastrService.info('You been logged out as admin');
    this.router.navigate(['adnin-login']);
  }
}
