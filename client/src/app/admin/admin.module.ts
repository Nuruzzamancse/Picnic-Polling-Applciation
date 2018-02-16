import {NgModule} from "@angular/core";
import {AdminDashboardComponent} from "./dashboard/admin-dashboard.component";
import {AdminLoginComponent} from "./auth/login/admin-login.component";
import {AdminRegisterComponent} from "./auth/register/admin-register.component";
import {AdminLogoutComponent} from "./auth/admin-logout.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AdminService} from "./admin.service";

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    AdminLogoutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'admin-dashboard', component: AdminDashboardComponent },
      { path: 'admin-login', component: AdminLoginComponent },
      { path: 'admin-register', component: AdminRegisterComponent },
      { path: 'admin-logout', component: AdminLogoutComponent }
    ])
  ],
  providers: [
    AdminService
  ]
})
export class AdminModule {}
