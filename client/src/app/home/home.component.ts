import {Component, OnInit} from "@angular/core";

@Component({
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  id = 'chart1';
  width = 800;
  height = 600;
  type = 'pie3d';
  dataFormat = 'json';
  dataSource;
  title = '';

  constructor() {
    this.dataSource = {
      "chart": {
        "caption": "Poll Result",
        "subCaption": "Vote Percentance of picnic polling",
        "numberprefix": "$",
        "theme": "fint"
      },
      "data": [
        {
          "label": "Bakersfield Central",
          "value": "880000"
        },
        {
          "label": "Garden Groove harbour",
          "value": "730000"
        },
        {
          "label": "Los Angeles Topanga",
          "value": "590000"
        },
        {
          "label": "Compton-Rancho Dom",
          "value": "520000"
        },
        {
          "label": "Daly City Serramonte",
          "value": "330000"
        }
      ]
    }
  }
  ngOnInit() {}

}
