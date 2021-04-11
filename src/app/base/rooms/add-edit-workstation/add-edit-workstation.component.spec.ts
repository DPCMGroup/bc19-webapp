import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkstationComponent } from './add-edit-workstation.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AddEditWorkstationComponent', () => {
  let component: AddEditWorkstationComponent;
  let fixture: ComponentFixture<AddEditWorkstationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AddEditWorkstationComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWorkstationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
