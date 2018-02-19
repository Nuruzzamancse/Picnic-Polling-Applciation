import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {ToastrService} from "./toastr.service";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private toastrService: ToastrService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkAdminLoggedIn(state.url);
  }

  private checkAdminLoggedIn(url: string) {
    if (this.authService.isAdminLoggedIn()) return true;
    this.toastrService.info('Please logged in as admin.');
    this.router.navigate(['admin-login']);
  }

}
