import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageserviceService {

  constructor() { }
  getData(key: string) {
    var localStore: any =
      localStorage.getItem(key) == null ? null : localStorage.getItem(key);
      // localStorage.getItem('password')
    return JSON.parse(localStore);
  }

  setData(key: string, data: any) {
    if (data == null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(data));
    }
  }
  static setBearerToken(bToken: string) {
    if (bToken == null || bToken == '') {
      return;
    }

    localStorage.setItem('bToken', bToken);
  }
  static getBearerToken() {
    let bToken = localStorage.getItem('bToken');

    if (bToken == null || bToken == '') {
      localStorage.removeItem('bToken');
      return null;
    }

    return 'Bearer ' + bToken;
  }
  
  clearData(key : string){
    localStorage.removeItem(key)
  }
}
