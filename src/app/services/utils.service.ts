import { Injectable } from '@angular/core';



export class UtilsService {

  constructor() { }

  private static tipo = {
    // tslint:disable-next-line:no-bitwise
    work : 1 << 12,
    // tslint:disable-next-line:no-bitwise
    room : 1 << 13,
    // tslint:disable-next-line:no-bitwise
    user : 1 << 14,
    // tslint:disable-next-line:no-bitwise
    failure : 1 << 0,
    // tslint:disable-next-line:no-bitwise
    no_found : 1 << 1,
    // tslint:disable-next-line:no-bitwise
    ok : 1 << 2
  };

  static checkReturnType(value): string {
    console.log( 'checkReturnType value: ' + value);
    // tslint:disable-next-line:no-bitwise
    if (this.tipo.work === (value & this.tipo.work)){
      // tslint:disable-next-line:no-bitwise
      if (this.tipo.failure === (value & this.tipo.failure)){
        return 'postazione: operazione fallita';
        // tslint:disable-next-line:no-bitwise
      }else if (this.tipo.no_found === (value & this.tipo.no_found)){
        return 'postazione: non trovata';
        // tslint:disable-next-line:no-bitwise
      }else if (this.tipo.ok === (value & this.tipo.ok)){
        return 'postazione: operazione riuscita';
      }
      // tslint:disable-next-line:no-bitwise
    }else if (this.tipo.room === (value & this.tipo.room)){
      console.log('is room');
      // tslint:disable-next-line:no-bitwise
      if (this.tipo.failure === (value & this.tipo.failure)){
        return 'stanza: operazione fallita';
        // tslint:disable-next-line:no-bitwise
      }else if (this.tipo.no_found === (value & this.tipo.no_found)){
        return 'stanza: non trovata';
        // tslint:disable-next-line:no-bitwise
      }else if (this.tipo.ok === (value & this.tipo.ok)){
        return 'stanza: operazione riuscita';
      }
      // tslint:disable-next-line:no-bitwise
    }else if (this.tipo.user === (value & this.tipo.user)){
      // tslint:disable-next-line:no-bitwise
      if (this.tipo.failure === (value & this.tipo.failure)){
        return 'utente: operazione fallita';
        // tslint:disable-next-line:no-bitwise
      }else if (this.tipo.no_found === (value & this.tipo.no_found)){
        return 'utente: non trovato';
        // tslint:disable-next-line:no-bitwise
      }else if (this.tipo.ok === (value & this.tipo.ok)){
        return 'utente: operazione riuscita';
      }
    }
  }


  public static convertDateAPIToHtml(datetime: string): string{
    // console.log('convert datetime: ' + datetime);
    if (datetime){
      const date = datetime.split(' ')[0];
      const dateParts = date.split('-');
      const newDate = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0];
      // console.log('date conversion: '+newDate);
      return newDate;
    }else{
      return null;
    }
  }
}
