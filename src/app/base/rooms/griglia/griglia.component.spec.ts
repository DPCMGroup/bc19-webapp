import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrigliaComponent } from './griglia.component';

describe('GrigliaComponent', () => {
  let component: GrigliaComponent;
  let fixture: ComponentFixture<GrigliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrigliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrigliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
