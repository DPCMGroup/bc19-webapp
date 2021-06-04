import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSanitizationsReportComponent } from './show-sanitizations-report.component';
import {of} from 'rxjs';
import {ReportComponent} from '../../report.component';
import {ReportsService} from '../../../../services/reports.service';

describe('ShowSanitizationsReportComponent', () => {
  let component: ShowSanitizationsReportComponent;
  let fixture: ComponentFixture<ShowSanitizationsReportComponent>;
  let reportsServiceStub: any;

  beforeEach(async () => {
    reportsServiceStub = {
      getOccupationsReport: () => of(),
      getSanitizationsReport: () => of(),
      getReports: () => of()
    };
    await TestBed.configureTestingModule({
      declarations: [ ReportComponent ],
      providers: [{provide: ReportsService, useValue: reportsServiceStub}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSanitizationsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
