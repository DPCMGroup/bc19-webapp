import { OccupationData } from './occupation-data';
import {LoginData} from './login-data';

describe('OccupationData', () => {
  it('should create an instance', () => {
    expect(new OccupationData()).toBeTruthy();
  });

  it('should set values properly', () => {
    const data = new OccupationData();
    data.idoccupation = 1;
    data.iduser = 1;
    data.username = '1';
    data.name = '1';
    data.surname = '1';
    data.type = 1;
    data.starttime = '1';
    data.endtime = '1';
    expect(data.idoccupation).toBe(1);
    expect(data.iduser).toBe(1);
    expect(data.username).toBe('1');
    expect(data.name).toBe('1');
    expect(data.surname).toBe('1');
    expect(data.type).toBe(1);
    expect(data.starttime).toBe('1');
    expect(data.endtime).toBe('1');
  });
});
