import {Component, OnInit} from "@angular/core";
import {HomeService} from "./home.service";
import {Place} from "../place/place";
import {Data} from "./home";

@Component({
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  places: Place[] = [];
  dataList: Data[] = [];

  id = 'chart1';
  width = 800;
  height = 600;
  type = 'column2d';
  dataFormat = 'json';
  dataSource;
  title = '';

  constructor(private homeService: HomeService) {

  }
  ngOnInit() {
    this.homeService.getPlaces().subscribe((data) => {
      if (data.success) {
        this.places = data.data;
        console.log(this.places);
        this.places.map((place) => {
          var newData = new Data();
          newData.label = place.placeName;
          newData.value = place.placeVotes.toString();
          this.dataList.push(newData);
        });

        this.dataSource = {
          "chart": {
            "caption": "Poll Result",
            "subCaption": "Vote Percentance of picnic polling",
            "numberprefix": "",
            "theme": "ocean"
          },
          "data": this.dataList
        };
      }
    });
  }

}
