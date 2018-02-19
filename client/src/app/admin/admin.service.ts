import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {Place} from "../place/place";
import {Student} from "../student/student";

@Injectable()
export class AdminService {
  jwtToken: string;
  constructor(private http: Http) {
    const theUser:any = JSON.parse(localStorage.getItem('currentAdmin'));
    if (theUser) {
      this.jwtToken = theUser.token;
    }
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

  createPlace(place: Place) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`http://localhost:8080/place`, JSON.stringify(place), options)
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

  deletePlace(place: Place) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:8080/place/${place._id}`, options)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getStudents() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.get(`http://localhost:8080/student`, options)
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

  deleteStudent(student: Student) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `${this.jwtToken}`);
    const options = new RequestOptions({ headers: headers });

    return this.http.delete(`http://localhost:8080/student/${student._id}`, options)
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
