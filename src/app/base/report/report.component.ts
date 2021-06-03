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
  startDate = '2020-01-01';
  endDate = '2030-01-01';
  changeVariable = true;

  setRadio(s: string): void{
    this.type = s;
    console.log(this.type);
  }

  confirmReportType(): void {
    this.confirmedType = this.type;
    this.notifyChange();
  }

  notifyChange(): void {
    this.changeVariable = !this.changeVariable;
  }

  getPossibleOperations(): string[]{
    switch (this.type){
      case 'occupations':
        return ['dates_search'];
        break;
      case 'sanitizations':
        return ['dates_search'];
        break;
      case 'reports':
        return [];
        break;
      default:
        return [];
        break;
    }
  }
}
