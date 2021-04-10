import { Component, OnInit } from '@angular/core';
import {SharedService} from 'src/app/shared.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {


  constructor(private service: SharedService) {
  }

  ReportList: any = [];
  ModalTitle: string | undefined;
  report: any;
  // tslint:disable-next-line
  ActivateShowReportComp: boolean = false;

  ngOnInit(): void {
    this.refreshReportList();
  }

  // tslint:disable-next-line:typedef
  addClick() {
    this.ModalTitle = 'Show Report';
    this.ActivateShowReportComp = true;
  }

  // tslint:disable-next-line:typedef
  closeClick() {
    this.ActivateShowReportComp = false;
    this.refreshReportList();
  }

  // tslint:disable-next-line:typedef
  refreshReportList() {
    this.service.getReportList().subscribe(data => {
      this.ReportList = data;
    });
  }
}
