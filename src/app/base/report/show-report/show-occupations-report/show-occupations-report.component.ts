import { Component, OnInit } from '@angular/core';
import {OccupationData} from '../../../../models/occupation-data';
import {ReportsService} from '../../../../services/reports.service';

@Component({
  selector: 'app-show-occupations-report',
  templateUrl: './show-occupations-report.component.html',
  styleUrls: ['./show-occupations-report.component.css']
})
export class ShowOccupationsReportComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }

  occupationsList: OccupationData[] = [];
  ngOnInit(): void {
    this.refresh();
  }

  setOccupations(data: OccupationData[]): void {
    this.occupationsList = data;
  }

  refresh(): void {
    this.reportsService.getOccupationsReport().subscribe( (data) => {
      this.setOccupations(data);
    });
  }

}
