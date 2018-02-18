import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {StudentService} from "./student.service";
import {StudentDashboardComponent} from "./dashboard/student-dashboard.component";
import {StudentLoginComponent} from "./auth/login/student-login.component";
import {StudentRegisterComponent} from "./auth/register/student-register.component";
import {StudentLogoutComponent} from "./auth/student-logout.component";
import {ToastrService} from "../common/toastr.service";
import {AuthService} from "../common/auth.service";
import {AuthGuardService} from "../common/auth-guard.service";

@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentLoginComponent,
    StudentRegisterComponent,
    StudentLogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'student-dashboard', component: StudentDashboardComponent },
      { path: 'student-login', component: StudentLoginComponent },
      { path: 'student-register', component: StudentRegisterComponent },
      { path: 'student-logout', component: StudentLogoutComponent }
    ])
  ],
  providers: [
    StudentService,
    ToastrService,
    AuthService,
    AuthGuardService
  ]
})
export class StudentModule {}
