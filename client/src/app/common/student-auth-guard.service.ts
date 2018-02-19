import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";
import {ToastrService} from "./toastr.service";

@Injectable()
export class StudentAuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkedStudentLoggedIn(state.url);
  }

  checkedStudentLoggedIn(url: string) {
    if (this.authService.isStudentLoggedIn()) return true;
    this.toastrService.info('Please log in as student.');
    this.router.navigate(['student-login']);
  }
}
