import { LoginData } from './login-data';

describe('LoginData', () => {
  it('should create an instance', () => {
    expect(new LoginData()).toBeTruthy();
  });

  it('should create instance with the write values', () => {
    const loginData = new LoginData();
    expect(loginData.username).toBe('');
    expect(loginData.password).toBe('');
  });

  it('should set values properly', () => {
    const loginData = new LoginData();
    loginData.username = 'name1';
    loginData.password = 'pass1';
    expect(loginData.username).toBe('name1');
    expect(loginData.password).toBe('pass1');
  });
});
