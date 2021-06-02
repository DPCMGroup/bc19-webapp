import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit {

  constructor() { }

  ReportList: any = [];
  @Input() type: string;

  ngOnInit(): void {
  }

}
