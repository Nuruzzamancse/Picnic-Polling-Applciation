import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  constructor(private http: Http) {}

  isStudentLoggedIn(): boolean {
    try {
      if (localStorage.getItem('currentStudent')) {
        return true;
      }
    } catch(e) {
      return false;
    }
    return false;
  }

  studentLogout(): void {
    localStorage.removeItem('currentItem');
  }

  studentLogin(student: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:8080/student-auth/login`, JSON.stringify(student), options)
      .map((response: Response) => {
        if (response.json().success) {
          localStorage.setItem('currentStudent', response.json().data);
        }
        return response.json();
      })
      .catch(this.handleError);
  }

  adminLogin(admin: any) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:8080/admin-auth/login`, JSON.stringify(admin), options)
      .map((response: Response) => {
        if (response.json().success) {
          localStorage.setItem('currentAdmin', response.json().data);
        }
        return response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error?: Response) {
    if (error) {
      console.log('Error in Contact Service: ' + error);
      return Observable.throw(error.json().error || 'Server Error');
    } else {
      console.log('Unknown err');
    }
  }
}
