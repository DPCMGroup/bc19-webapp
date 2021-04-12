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

  type = 'Occupation';
  confirmedType = 'Occupation';

  ngOnInit(): void {
    this.refreshReportList();
    console.log(this.type);
  }

  ngOnChange(): void {
    console.log('changed');
  }

  setRadio(s: string): void{
    this.type = s;
    console.log(this.type);
  }

  // tslint:disable-next-line:typedef
  addClick() {
    this.ModalTitle = 'Show Report';
    this.ActivateShowReportComp = true;
    // I copy the values of my filter to the confirmed one, that will be used by the show-report component
    this.confirmedType = this.type;
  }

  // tslint:disable-next-line:typedef
  closeClick() {
    this.ActivateShowReportComp = false;
    this.refreshReportList();
  }

  // tslint:disable-next-line:typedef
  refreshReportList() {
    /*this.service.getReportList().subscribe(data => {
      this.ReportList = data;
    });*/
  }
}
