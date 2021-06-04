import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportComponent } from './report.component';
import {of} from 'rxjs';
import {ReportsService} from '../../services/reports.service';
import {ShowOccupationsReportComponent} from './show-report/show-occupations-report/show-occupations-report.component';
import {ShowSanitizationsReportComponent} from './show-report/show-sanitizations-report/show-sanitizations-report.component';
import {ShowReportsReportComponent} from './show-report/show-reports-report/show-reports-report.component';

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

  it('should set type', () => {
    component.type = 'a';
    component.setRadio('b');
    expect(component.type).toBe('b');
  });

  it('should set confirmedType', () => {
    component.type = 'a';
    component.confirmedType = 'b';
    component.confirmReportType();
    expect(component.confirmedType).toBe('a');
  });

  it('should give occupations possible operations properly', () => {
    component.type = 'occupations';
    expect(component.getPossibleOperations()).toEqual(['dates_search', 'complete_report']);
  });

  it('should give sanitizations possible operations properly', () => {
    component.type = 'sanitizations';
    expect(component.getPossibleOperations()).toEqual(['dates_search', 'complete_report']);
  });

  it('should give reports possible operations properly', () => {
    component.type = 'reports';
    expect(component.getPossibleOperations()).toEqual(['dates_search', 'complete_report']);
  });

  it('should give not specified possible operations properly', () => {
    component.type = 'abc';
    expect(component.getPossibleOperations()).toEqual([]);
  });

  it('should download complete report', () => {
    spyOn(component, 'downloadByNameAndContent');
    component.downloadCompleteReport().then( () => {
      expect(component.downloadByNameAndContent).toHaveBeenCalled();
    });
  });

  it('should download occupations in csv', () => {
    spyOn(component, 'downloadByNameAndContent');
    component.occupChild = new ShowOccupationsReportComponent(reportsServiceStub);
    component.occupChild.getDownloadData = jasmine.createSpy().and.returnValue('cont');
    component.confirmedType = 'occupations';
    component.download();
    expect(component.downloadByNameAndContent).toHaveBeenCalledOnceWith('occupations.csv', 'cont');
  });

  it('should download sanitizations in csv', () => {
    spyOn(component, 'downloadByNameAndContent');
    component.sanitChild = new ShowSanitizationsReportComponent(reportsServiceStub);
    component.sanitChild.getDownloadData = jasmine.createSpy().and.returnValue('cont');
    component.confirmedType = 'sanitizations';
    component.download();
    expect(component.downloadByNameAndContent).toHaveBeenCalledOnceWith('sanitizations.csv', 'cont');
  });

  it('should download reports in csv', () => {
    spyOn(component, 'downloadByNameAndContent');
    component.repsChild = new ShowReportsReportComponent(reportsServiceStub);
    component.repsChild.getDownloadData = jasmine.createSpy().and.returnValue('cont');
    component.confirmedType = 'reports';
    component.download();
    expect(component.downloadByNameAndContent).toHaveBeenCalledOnceWith('reports.csv', 'cont');
  });
});
