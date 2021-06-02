import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from './report.component';
import {of} from 'rxjs';
import {ReportsService} from '../../services/reports.service';

describe('ReportComponent', () => {
  let component: ReportComponent;
  let fixture: ComponentFixture<ReportComponent>;
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
    fixture = TestBed.createComponent(ReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
