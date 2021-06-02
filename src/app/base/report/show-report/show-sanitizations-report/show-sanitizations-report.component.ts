import { Component, OnInit } from '@angular/core';
import {SanitizationData} from '../../../../models/sanitization-data';

@Component({
  selector: 'app-show-sanitizations-report',
  templateUrl: './show-sanitizations-report.component.html',
  styleUrls: ['./show-sanitizations-report.component.css']
})
export class ShowSanitizationsReportComponent implements OnInit {

  constructor() { }

  sanitizationsList: SanitizationData[] = [];
  ngOnInit(): void {
  }

}
