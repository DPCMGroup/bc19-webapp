import {RoomData, RoomDataWithDates} from './room-data';
import {OccupationData} from './occupation-data';

describe('RoomData', () => {
  it('should create an instance', () => {
    expect(new RoomData()).toBeTruthy();
  });

  it('should set values properly', () => {
    const data = new RoomData();
    data.id = 0;
    data.roomname = '';
    data.xroom = 0;
    data.yroom = 0;
    data.archived = 0;
    data.unavailable = 0;
    expect(data.id).toBe(0);
    expect(data.roomname).toBe('');
    expect(data.xroom).toBe(0);
    expect(data.yroom).toBe(0);
    expect(data.archived).toBe(0);
    expect(data.unavailable).toBe(0);
  });

  it('should set RoomDataWithDates values properly', () => {
    const data = new RoomDataWithDates();
    data.isDataSet = 1;
    data.failureFrom = '';
    data.failureTo = '';
    expect(data.isDataSet).toBe(1);
    expect(data.failureFrom).toBe('');
    expect(data.failureTo).toBe('');
  });
});
