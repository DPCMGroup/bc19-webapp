import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchOccupationsComponent } from './search-occupations.component';

describe('SearchOccupationsComponent', () => {
  let component: SearchOccupationsComponent;
  let fixture: ComponentFixture<SearchOccupationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchOccupationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchOccupationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
