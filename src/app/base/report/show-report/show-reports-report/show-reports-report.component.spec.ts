import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReportsReportComponent } from './show-reports-report.component';
import {of} from 'rxjs';
import {ReportComponent} from '../../report.component';
import {ReportsService} from '../../../../services/reports.service';

describe('ShowReportsReportComponent', () => {
  let component: ShowReportsReportComponent;
  let fixture: ComponentFixture<ShowReportsReportComponent>;
  let reportsServiceStub: any;

  beforeEach(async () => {
    reportsServiceStub = {
      getOccupationsReport: () => of(),
      getSanitizationsReport: () => of(),
      getReportsReport: () => of()
    };
    await TestBed.configureTestingModule({
      declarations: [ ReportComponent ],
      providers: [{provide: ReportsService, useValue: reportsServiceStub}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReportsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
