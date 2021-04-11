import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCredentialComponent } from './show-credential.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ShowCredentialComponent', () => {
  let component: ShowCredentialComponent;
  let fixture: ComponentFixture<ShowCredentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
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
