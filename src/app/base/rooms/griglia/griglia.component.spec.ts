import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrigliaComponent } from './griglia.component';
import {WorkstationData} from '../../../models/workstation-data';

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

  it('should get array from num', () => {
    expect(component.getArrayFromNum(3)).toEqual([0, 1, 2]);
  });

  it('should receive item and pass it on', () => {
    spyOn(component.newItemEvent, 'emit');
    component.receiveItem(new WorkstationData());
    expect(component.newItemEvent.emit).toHaveBeenCalledOnceWith(new WorkstationData());
  });

  it('should call init on ngOnChanges', () => {
    spyOn(component, 'init');
    component.ngOnChanges();
    expect(component.init).toHaveBeenCalled();
  });
});
