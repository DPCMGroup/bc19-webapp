import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {OccupationData} from '../../../../models/occupation-data';
import {ReportsService} from '../../../../services/reports.service';
import {UtilsService} from '../../../../services/utils.service';

@Component({
  selector: 'app-show-occupations-report',
  templateUrl: './show-occupations-report.component.html',
  styleUrls: ['./show-occupations-report.component.css']
})
export class ShowOccupationsReportComponent implements OnChanges {
  constructor(private reportsService: ReportsService) { }

  @Input() startDate: string;
  @Input() endDate: string;
  @Input() changeVariable: boolean;

  occupationsList: OccupationData[] = [];

  ngOnChanges(): void {
    this.refresh();
  }

  setOccupations(data: OccupationData[]): void {
    this.occupationsList = data;
  }

  refresh(): void {
    console.log(`${this.startDate} : ${this.endDate}`);
    this.reportsService.getOccupationsReport(this.startDate, this.endDate).subscribe( (data) => {
      this.setOccupations(data);
    });
  }
  getDownloadData(): string{
    return UtilsService.objectArrayToCsv(this.occupationsList);
  }

  typeNumToString(n: number): string {
    return UtilsService.typeNumToString(n);
  }
}


