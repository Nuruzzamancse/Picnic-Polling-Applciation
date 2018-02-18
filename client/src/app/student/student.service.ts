import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Student} from "./student";

@Injectable()
export class StudentService {
  constructor(private http: Http) {}

  createStudent(student: Student) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:8080/student`, JSON.stringify(student), options)
      .map((response: Response) => response.json())
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
