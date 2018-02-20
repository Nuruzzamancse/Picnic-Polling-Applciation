import {Component, OnInit} from "@angular/core";
import {AdminService} from "../../admin/admin.service";
import {StudentService} from "../student.service";
import {ToastrService} from "../../common/toastr.service";
import {Student} from "../student";
import {Place} from "../../place/place";

@Component({
  templateUrl: './student-dashboard.component.html',
  styleUrls: [
    './student-dashboard.component.css'
  ]
})
export class StudentDashboardComponent implements OnInit {
  places: Place[] = [];
  currentStudent: Student = new Student();

  votedPlace: Place = new Place();

  constructor(private adminService: AdminService,
              private studentService: StudentService,
              private toastrService: ToastrService) {}
  ngOnInit() {
    this.getAllPlaces();

    this.studentService.getCurrentStudent().subscribe((data) => {
      this.currentStudent = data.data;
      if (this.currentStudent.isApproved == false) {
        this.toastrService.warning('You are not approved for vote yet');
      } else {
        if (this.currentStudent.isVoteAvailable == true) {
          this.toastrService.info('Your vote is still available');
        } else {
          this.toastrService.info('Your vote is already casted');
        }
      }
    });
  }

  getAllPlaces() {
    this.studentService.getPlaces().subscribe((data) => {
      console.log(data);
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

  onClickVote() {
    if (this.votedPlace) {
      console.log(this.votedPlace);
      this.currentStudent.isVoteAvailable = false;

      this.studentService.updateStudent(this.currentStudent).subscribe((data) => {
        if (data.success) {
          this.toastrService.success('Your voting status changed');
        } else {
          if (data.message) {
            this.toastrService.warning(data.message);
          } else {
            this.toastrService.error('Error in updating student information.');
          }
        }
      });

      this.votedPlace.placeVotes = parseInt(this.votedPlace.placeVotes.toString()) + 1;

      this.studentService.updatePlace(this.votedPlace).subscribe((data) => {
        if (data.success) {
          this.toastrService.success('Your vote is casted successfully');
        } else {
          if (data.message) {
            this.toastrService.warning(data.message);
          } else {
            this.toastrService.error('Error in casting your vote');
          }
        }
      });
    }
  }
}
