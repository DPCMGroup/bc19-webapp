import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSanitizationsReportComponent } from './show-sanitizations-report.component';

describe('ShowSanitizationsReportComponent', () => {
  let component: ShowSanitizationsReportComponent;
  let fixture: ComponentFixture<ShowSanitizationsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSanitizationsReportComponent ]
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
