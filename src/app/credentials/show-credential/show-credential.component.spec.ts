import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCredentialComponent } from './show-credential.component';

describe('ShowCredentialComponent', () => {
  let component: ShowCredentialComponent;
  let fixture: ComponentFixture<ShowCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCredentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowCredentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
