import { Component, OnInit } from '@angular/core';
import {OccupationData} from '../../../../models/occupation-data';

@Component({
  selector: 'app-show-occupations-report',
  templateUrl: './show-occupations-report.component.html',
  styleUrls: ['./show-occupations-report.component.css']
})
export class ShowOccupationsReportComponent implements OnInit {

  constructor() { }

  occupationsList: OccupationData[] = [];
  ngOnInit(): void {
  }

}
