import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReportsReportComponent } from './show-reports-report.component';

describe('ShowReportsReportComponent', () => {
  let component: ShowReportsReportComponent;
  let fixture: ComponentFixture<ShowReportsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowReportsReportComponent ]
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
