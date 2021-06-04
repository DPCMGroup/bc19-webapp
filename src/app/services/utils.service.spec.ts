import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UtilsService]
    });
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should convert error number to string properly', () => {
    expect(UtilsService.checkReturnType(4097)).toBe('postazione: operazione fallita');
    expect(UtilsService.checkReturnType(4098)).toBe('postazione: non trovata');
    expect(UtilsService.checkReturnType(4100)).toBe('postazione: operazione riuscita');

    expect(UtilsService.checkReturnType(8193)).toBe('stanza: operazione fallita');
    expect(UtilsService.checkReturnType(8194)).toBe('stanza: non trovata');
    expect(UtilsService.checkReturnType(8196)).toBe('stanza: operazione riuscita');

    expect(UtilsService.checkReturnType(16385)).toBe('utente: operazione fallita');
    expect(UtilsService.checkReturnType(16386)).toBe('utente: non trovato');
    expect(UtilsService.checkReturnType(16388)).toBe('utente: operazione riuscita');
  });

  it( 'should convert date properly', () => {
    expect(UtilsService.convertDateAPIToHtml('2021/10/10 00:00:00')).toBe('2021/10/10');
    expect(UtilsService.convertDateAPIToHtml(undefined)).toBe(null);
    expect(UtilsService.convertDateAPIToHtml(null)).toBe(null);
  });
});
