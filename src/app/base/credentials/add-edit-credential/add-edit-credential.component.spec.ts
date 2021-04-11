import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCredentialComponent } from './add-edit-credential.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('AddEditCredentialComponent', () => {
  let component: AddEditCredentialComponent;
  let fixture: ComponentFixture<AddEditCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AddEditCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
