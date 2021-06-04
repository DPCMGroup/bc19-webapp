import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWorkstationComponent } from './add-edit-workstation.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {WorkstationsService} from '../../../services/workstations.service';
import {WorkstationFailuresService} from '../../../services/workstation-failures.service';
import {of} from 'rxjs';

describe('AddEditWorkstationComponent', () => {
  let component: AddEditWorkstationComponent;
  let fixture: ComponentFixture<AddEditWorkstationComponent>;
  let workstationServiceStub: any;
  let workstationFailureServiceStub: any;

  beforeEach(async () => {
    workstationServiceStub = {
      addWorkstation: (newWork) => of('10')
    };
    workstationFailureServiceStub = {
      addFailure: (newFail) => of('10')
    };
    await TestBed.configureTestingModule({
      declarations: [ AddEditWorkstationComponent ],
      providers: [{provide: WorkstationsService, useValue: workstationServiceStub},
        {provide: WorkstationFailuresService, useValue: workstationFailureServiceStub}]
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

  it('should get workstation from local values', () => {
    component.workstationname = 'name';
    component.xworkstation = '0';
    component.yworkstation = '1';
    component.state = 0;
    component.sanitized = 0;
    component.archived = 0;
    const work = component.getWorkstationFromLocalValues();
    expect(work.workstationname).toBe('name');
    expect(work.xworkstation).toBe(0);
    expect(work.yworkstation).toBe(1);
    expect(work.state).toBe(0);
    expect(work.sanitized).toBe(0);
    expect(work.archived).toBe(0);
  });

  it('should get workstation failure from local values if broken', () => {
    component.stateIsBroken = true;
    component.id = 0;
    component.startDate = '2021-01-01';
    component.endDate = '2030-01-01';
    const workFail = component.getWorkFailureFromLocalValues();
    expect(workFail).toBeTruthy();
    expect(workFail.idworkstation).toBe(0);
    expect(workFail.starttime).toBe('2021-01-01 00:00:00');
    expect(workFail.endtime).toBe('2030-01-01 00:00:00');
  });

  it('should not get workstation failure from local values if not unavailable', () => {
    component.state = 0;
    const roomFail = component.getWorkFailureFromLocalValues();
    expect(roomFail).toBeFalsy();
  });

  it('should call addWorkstation', () => {
    spyOn(component, 'addWorkstation');
    component.action = 'add';
    component.takeAction();
    expect(component.addWorkstation).toHaveBeenCalled();
  });

  it('should call editWorkstation', () => {
    spyOn(component, 'editWorkstation');
    component.action = 'edit';
    component.takeAction();
    expect(component.editWorkstation).toHaveBeenCalled();
  });
});
