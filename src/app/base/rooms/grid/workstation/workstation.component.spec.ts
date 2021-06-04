import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkstationComponent } from './workstation.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {of} from 'rxjs';
import {WorkstationsService} from '../../../../services/workstations.service';
import {map} from 'rxjs/operators';
import {WorkstationData} from '../../../../models/workstation-data';


describe('WorkstationComponent', () => {
  let component: WorkstationComponent;
  let fixture: ComponentFixture<WorkstationComponent>;
  let serviceStub: any;
  beforeEach(async () => {
    serviceStub = {
      deleteWorkstation: () => of('10'),
    };
    await TestBed.configureTestingModule({
      declarations: [ WorkstationComponent ],
      providers: [{ provide: WorkstationsService, useValue: serviceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkstationComponent);
    component = fixture.componentInstance;
    const de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should convert sanitized num properly', () => {
    const mapping = new Map<number, string>();
    mapping.set(0, 'Non igienizzata');
    mapping.set(1, 'Igienizzata');
    mapping.forEach((value, key) => {
      expect(component.sanitizedNumToString(key) === mapping.get(key)).toBeTrue();
    });
  });

  it('should convert state num properly', () => {
    const mapping = new Map<number, string>();
    mapping.set(0, 'Disponibile');
    mapping.set(1, 'Occupata');
    mapping.set(2, 'Prenotata');
    mapping.set(3, 'Rotta');
    mapping.forEach((value, key) => {
      expect(component.stateNumToString(key) === mapping.get(key)).toBeTrue();
    });
  });

  it('should give identifier', () => {
    component.insertedPosX = 5;
    component.insertedPosY = 3;
    component.insertedRoomId = 16;
    expect(component.getIdentifier() === '5316').toBeTrue();
  });

  // I don't think this test is written appropriately
  it('should delete workstation', () => {
    component.workstation = new WorkstationData();
    expect(component.workstation).toBeTruthy();
    component.deleteWorkstation();
    expect(component.workstation).toBe(null);
  });


  it('should convert state and sanitize to color properly', () => {
    component.workstation = new WorkstationData();
    component.workstation.state = 0;
    component.workstation.sanitized = 0;
    expect(component.getColorByState()).toBe('primary');
    component.workstation.state = 0;
    component.workstation.sanitized = 1;
    expect(component.getColorByState()).toBe('success');
    component.workstation.state = 1;
    component.workstation.sanitized = 0;
    expect(component.getColorByState()).toBe('outline-danger');
    component.workstation.state = 1;
    component.workstation.sanitized = 1;
    expect(component.getColorByState()).toBe('secondary');
    component.workstation.state = 2;
    component.workstation.sanitized = 0;
    expect(component.getColorByState()).toBe('danger');
    component.workstation.state = 2;
    component.workstation.sanitized = 1;
    expect(component.getColorByState()).toBe('info');
    component.workstation.state = 3;
    component.workstation.sanitized = 0;
    expect(component.getColorByState()).toBe('dark');
    component.workstation.state = 3;
    component.workstation.sanitized = 1;
    expect(component.getColorByState()).toBe('warning');
  });
});
