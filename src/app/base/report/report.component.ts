import {Component, OnInit, ViewChild} from '@angular/core';
import {ReportsService} from '../../services/reports.service';
import {ShowOccupationsReportComponent} from './show-report/show-occupations-report/show-occupations-report.component';
import {ShowSanitizationsReportComponent} from './show-report/show-sanitizations-report/show-sanitizations-report.component';
import {ShowReportsReportComponent} from './show-report/show-reports-report/show-reports-report.component';
import {OccupationData} from '../../models/occupation-data';
import {SanitizationData} from '../../models/sanitization-data';
import {UtilsService} from '../../services/utils.service';

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
  @ViewChild(ShowOccupationsReportComponent) occupChild: ShowOccupationsReportComponent;
  @ViewChild(ShowSanitizationsReportComponent) sanitChild: ShowSanitizationsReportComponent;
  @ViewChild(ShowReportsReportComponent) repsChild: ShowReportsReportComponent;

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
        return ['dates_search', 'complete_report'];
      case 'sanitizations':
        return ['dates_search', 'complete_report'];
      case 'reports':
        return ['dates_search', 'complete_report'];
      default:
        return [];
    }
  }



  download(): void{
    let filename = '';
    let content = '';
    switch (this.confirmedType){
      case 'occupations':
        filename = 'occupations.csv';
        content = this.occupChild.getDownloadData();
        break;
      case 'sanitizations':
        filename = 'sanitizations.csv';
        content = this.sanitChild.getDownloadData();
        break;
      case 'reports':
        filename = 'reports.csv';
        content = this.repsChild.getDownloadData();
        break;
    }

    this.downloadByNameAndContent(filename, content);
  }

  downloadByNameAndContent(filename, content): void{
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  async downloadCompleteReport(): Promise<void>{
    const filename = 'complete.csv';
    let content = '';
    let occups: OccupationData[] = [];
    let sanits: SanitizationData[] = [];
    const promises = [
    this.reportsService.getOccupationsReport(this.startDate, this.endDate).toPromise().then((data) => {
      occups = data;
    }),
    this.reportsService.getSanitizationsReport(this.startDate, this.endDate).toPromise().then((data) => {
      sanits = data;
    })];
    await Promise.all(promises);
    content = UtilsService.objectArrayToCsv(occups) + '\n' + UtilsService.objectArrayToCsv(sanits);
    this.downloadByNameAndContent(filename, content);
  }


}
