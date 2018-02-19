import {Injectable} from "@angular/core";
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Student} from "./student";
import {Place} from "../place/place";

@Injectable()
export class StudentService {

  jwtToken: string;
  constructor(private http: Http) {
    const theUser:any = JSON.parse(localStorage.getItem('currentStudent'));
    if (theUser) {
      this.jwtToken = theUser.token;
    }
  }

  createStudent(student: Student) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:8080/student`, JSON.stringify(student), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getCurrentStudent() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    const studentId = JSON.parse(localStorage.getItem('currentStudent')).data._id;
    console.log(studentId);

    return this.http.get(`http://localhost:8080/student/${studentId}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getPlaces() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:8080/place`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updateStudent(student: Student) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.patch(`http://localhost:8080/student/${student._id}`, JSON.stringify(student), options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  updatePlace(place: Place) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.patch(`http://localhost:8080/place/${place._id}`, JSON.stringify(place), options)
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
