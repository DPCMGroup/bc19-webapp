import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {SanitizationData} from '../../../../models/sanitization-data';
import {ReportsService} from '../../../../services/reports.service';
import {OccupationData} from '../../../../models/occupation-data';

@Component({
  selector: 'app-show-sanitizations-report',
  templateUrl: './show-sanitizations-report.component.html',
  styleUrls: ['./show-sanitizations-report.component.css']
})
export class ShowSanitizationsReportComponent implements OnChanges {

  constructor(private reportsService: ReportsService) { }

  @Input() startDate: string;
  @Input() endDate: string;
  @Input() changeVariable: boolean;

  sanitizationsList: SanitizationData[] = [];

  ngOnChanges(): void {
    this.refresh();
  }

  setOccupations(data: SanitizationData[]): void {
    this.sanitizationsList = data;
  }

  refresh(): void {
    this.reportsService.getSanitizationsReport(this.startDate, this.endDate).subscribe( (data) => {
      this.setOccupations(data);
    });
  }

}
