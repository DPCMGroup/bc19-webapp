import { Component, OnInit } from '@angular/core';
import {ReportsService} from '../../services/reports.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {


  constructor(private reportsService: ReportsService) {
  }

  type = 'occupations';
  confirmedType = '';

  setRadio(s: string): void{
    this.type = s;
    console.log(this.type);
  }

  confirmReportType(): void {
    this.confirmedType = this.type;
  }
}
