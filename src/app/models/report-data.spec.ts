import { ReportData } from './report-data';

describe('ReportData', () => {
  it('should create an instance', () => {
    expect(new ReportData()).toBeTruthy();
  });

  it('should set values properly', () => {
    const data = new ReportData();
    data.id = 0;
    data.reporttime = '';
    data.blockchainhask = '';
    data.fileHash = '';
    expect(data.id).toBe(0);
    expect(data.reporttime).toBe('');
    expect(data.blockchainhask).toBe('');
    expect(data.fileHash).toBe('');
  });
});
