import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOccupationsReportComponent } from './show-occupations-report.component';

describe('ShowOccupationsReportComponent', () => {
  let component: ShowOccupationsReportComponent;
  let fixture: ComponentFixture<ShowOccupationsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowOccupationsReportComponent ]
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
});
