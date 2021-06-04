import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SanitizationData} from '../../../../models/sanitization-data';
import {ReportsService} from '../../../../services/reports.service';
import {OccupationData} from '../../../../models/occupation-data';
import {ReportData} from '../../../../models/report-data';
import {UtilsService} from '../../../../services/utils.service';

@Component({
  selector: 'app-show-reports-report',
  templateUrl: './show-reports-report.component.html',
  styleUrls: ['./show-reports-report.component.css']
})
export class ShowReportsReportComponent implements OnChanges {

  constructor(private reportsService: ReportsService) { }

  @Input() changeVariable: boolean;

  reportsList: ReportData[] = [];
  ngOnChanges(): void {
    this.refresh();
  }

  setReports(data: ReportData[]): void {
    this.reportsList = data;
  }

  refresh(): void {
    this.reportsService.getReportsReport().subscribe( (data) => {
      this.setReports(data);
    });
  }

  getDownloadData(): string{
    return UtilsService.objectArrayToCsv(this.reportsList);
  }
}
