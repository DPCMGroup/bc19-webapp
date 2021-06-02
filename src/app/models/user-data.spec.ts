import { UserData } from './user-data';

describe('UserData', () => {
  it('should create an instance', () => {
    expect(new UserData()).toBeTruthy();
  });

  it('should create instance with the write values', () => {
    const data = new UserData();
    expect(data.id).toBe(0);
    expect(data.username).toBe('');
    expect(data.password).toBe('');
    expect(data.name).toBe('');
    expect(data.surname).toBe('');
    expect(data.mail).toBe('');
    expect(data.type).toBe(0);
    expect(data.archived).toBe(0);
  });

  it('should set values properly', () => {
    const data = new UserData();
    data.id = 1;
    data.username = 'usern';
    data.password = 'pass';
    data.name = 'name';
    data.surname = 'surname';
    data.mail = 'mail';
    data.type = 2;
    data.archived = 0;

    expect(data.id).toBe(1);
    expect(data.username).toBe('usern');
    expect(data.password).toBe('pass');
    expect(data.name).toBe('name');
    expect(data.surname).toBe('surname');
    expect(data.mail).toBe('mail');
    expect(data.type).toBe(2);
    expect(data.archived).toBe(0);
  });
});
