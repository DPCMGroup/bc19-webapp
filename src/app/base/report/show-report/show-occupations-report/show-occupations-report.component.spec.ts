import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOccupationsReportComponent } from './show-occupations-report.component';
import {of} from 'rxjs';
import {ReportComponent} from '../../report.component';
import {ReportsService} from '../../../../services/reports.service';
import {OccupationData} from '../../../../models/occupation-data';

describe('ShowOccupationsReportComponent', () => {
  let component: ShowOccupationsReportComponent;
  let fixture: ComponentFixture<ShowOccupationsReportComponent>;
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
    fixture = TestBed.createComponent(ShowOccupationsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set occupationsList', () => {
    const list = [new OccupationData()];
    component.setOccupations(list);
    expect(component.occupationsList).toEqual(list);
  });
});
