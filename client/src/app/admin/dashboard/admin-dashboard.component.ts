import {Component, OnInit} from "@angular/core";
import {Student} from "../../student/student";
import {Place} from "../../place/place";

@Component({
  templateUrl: './admin-dashboard.component.html',
  styleUrls: [
    './admin-dashboard.component.css'
  ]
})
export class AdminDashboardComponent implements OnInit {

  students: Student[] = [];
  places: Place[] = [];
  student: Student;
  place: Place;

  constructor() {}
  ngOnInit() {
    this.student = new Student();
    this.student.studentName = 'student 01 name';
    this.student.studentRoll = 1;
    this.student.studentPassword = 'student01Password';
    this.student.studentEmail = 'student01@mail.com';
    this.student.isVoteAvailable = false;
    this.student.isApproved = false;
    for (let index=0; index<10; index++) this.students.push(this.student);

    this.place = new Place();
    this.place.placeName = 'place name 01';
    this.place.placeDescription = 'place Description 01';
    this.place.placeVotes = 10;
    for (let index=0; index<5; index++) this.places.push(this.place);

  }
}
