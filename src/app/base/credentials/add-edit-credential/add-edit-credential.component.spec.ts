import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCredentialComponent } from './add-edit-credential.component';

describe('AddEditCredentialComponent', () => {
  let component: AddEditCredentialComponent;
  let fixture: ComponentFixture<AddEditCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
