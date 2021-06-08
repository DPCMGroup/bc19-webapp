import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';



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
    // console.log('workstation convert datetime: ' + datetime);
    if (datetime){
      const v1 = datetime.split(' ')[0];
      // const parts = v1.split('-');
      // const conv = parts[2] + '-' + parts[1] + '-' + parts[0];
      return v1;
    }else{
      return null;
    }
  }

  public static objectArrayToCsv(arr): string {
    let text = '';
    if (arr) {
      arr.forEach((item) => {
        text += Object.values(item).join(',') + '\n';
      });
    }
    return text;
  }

  static typeNumToString(type: number): string{
    let typeString = '';
    switch (type){
      case 0:
        typeString = 'Amministratore';
        break;
      case 1:
        typeString = 'Dipendente';
        break;
      case 2:
        typeString = 'Addetto';
        break;
    }
    return typeString;
  }

  static getDefaulStartAndEndDates(): any {
    const dates = {
      startDate: '',
      endDate: ''
    };
    const currentDate = new Date().toLocaleDateString();
    const parts = currentDate.split('/');
    for (let i = 0; i < parts.length; i++){
      parts[i] = parts[i].length === 1 ? '0' + parts[i] : parts[i];
    }
    const newDate = parts[2] + '-' + parts[0] + '-' + parts[1];
    dates.startDate = newDate;
    dates.endDate = '2030-01-01';

    return dates;
  }


  /*
  public static tempAlert(msg, duration = 1): void{
    const el = document.createElement('div');
    el.setAttribute('style', 'font-size: 5em;position:absolute;top:0%;left:20%;background-color:white;');
    el.innerHTML = msg;
    setTimeout(() => {
      el.parentNode.removeChild(el);
    }, duration);
    document.body.appendChild(el);
  }*/

}
