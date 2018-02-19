import {Component, OnInit} from "@angular/core";
import {Student} from "../../student/student";
import {Place} from "../../place/place";
import {AdminService} from "../admin.service";
import {ToastrService} from "../../common/toastr.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import index from "@angular/cli/lib/cli";

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

  newPlace: Place;
  newPlaceName: string;
  newPlaceDescription: string;

  currentPlace: Place;
  currentStudent: Student;

  constructor(private adminService: AdminService,
              private toastrService: ToastrService) {}
  ngOnInit() {

    this.currentPlace = new Place();
    this.currentStudent = new Student();

    this.student = new Student();
    this.student.studentName = 'student 01 name';
    this.student.studentRoll = 1;
    this.student.studentPassword = 'student01Password';
    this.student.studentEmail = 'student01@mail.com';
    this.student.isVoteAvailable = false;
    this.student.isApproved = false;
    for (let index=0; index<10; index++) this.students.push(this.student);

    this.getAllPlaces();
    this.getAllStudents();
  }

  getAllPlaces() {
    this.adminService.getPlaces().subscribe((data) => {
      console.log(data.data);
      if (data.success) {
        this.places = data.data;
      } else {
        if (data.message) {
          this.toastrService.warning(data.message);
        } else {
          this.toastrService.error('Error in fetching places information.');
        }
      }
    });
  }

  onClickCreatePlace() {
    console.log(this.newPlaceName);
    console.log(this.newPlaceDescription);
    if (this.newPlaceName.length <= 0 || this.newPlaceDescription.length <= 0) {
      this.toastrService.warning('Invalid or Incomplete Information');
    } else {
      this.newPlace = new Place();
      this.newPlace.placeName = this.newPlaceName;
      this.newPlace.placeDescription = this.newPlaceDescription;
      this.adminService.createPlace(this.newPlace).subscribe((data) => {
        this.places.push(data.data);
        this.toastrService.success('Successfully created the place.');
      });
    }
  }

  onClickPlaceTable(place: Place) {
    this.currentPlace = place;
  }

  onClickUpdatePlace() {
    this.adminService.updatePlace(this.currentPlace).subscribe((data) => {
      if (data.success) {
        this.toastrService.success('Successfully updated the place.');
      } else {
        if (data.message) {
          this.toastrService.warning(data.message);
        } else {
          this.toastrService.error('Error in updating the place.');
        }
      }
    });
  }

  onClickDeletePlace() {
    this.adminService.deletePlace(this.currentPlace).subscribe((data) => {
      if (data.success) {
        this.places = this.places.filter(place => place._id !=  this.currentPlace._id);
        this.toastrService.success('Successfully removed the place.');
      } else {
        if (data.message) {
          this.toastrService.warning(data.message);
        } else {
          this.toastrService.error('Error in deleting the place.');
        }
      }
    });
  }

  getAllStudents() {
    this.adminService.getStudents().subscribe((data) => {
      console.log(data);
      if (data.success) {
        this.students = data.data;
      } else {
        if (data.message) {
          this.toastrService.warning(data.message);
        } else {
          this.toastrService.error('Error in fetching Students information.');
        }
      }
    });
  }

  onClickStudentTable(student: Student) {
    this.currentStudent = student;
  }

  onClickUpdateStudent() {

    this.adminService.updateStudent(this.currentStudent).subscribe((data) => {
      if (data.success) {
        this.toastrService.success('Successfully updated the student.');
      } else {
        if (data.message) {
          this.toastrService.warning(data.message);
        } else {
          this.toastrService.error('Error in updating the student.');
        }
      }
    });
  }

  onClickChangeStudentApproval() {
    this.currentStudent.isApproved = !this.currentStudent.isApproved;
    this.adminService.updateStudent(this.currentStudent).subscribe((data) => {
      if (data.success) {
        this.toastrService.success('Successfully change the student approval status.');
      } else {
        if (data.message) {
          this.toastrService.warning(data.message);
        } else {
          this.toastrService.error('Error in Approving the student.');
        }
      }
    });
  }

  onClickDeleteStudent() {
    this.adminService.deleteStudent(this.currentStudent).subscribe((data) => {
      if (data.success) {
        this.students = this.students.filter(student => student._id !=  this.currentStudent._id);
        this.toastrService.success('Successfully removed the Student.');
      } else {
        if (data.message) {
          this.toastrService.warning(data.message);
        } else {
          this.toastrService.error('Error in deleting the student.');
        }
      }
    });
  }

}
