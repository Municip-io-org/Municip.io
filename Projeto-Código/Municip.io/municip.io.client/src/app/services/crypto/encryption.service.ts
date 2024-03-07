import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private readonly secretKey = 'estaeapasswordutilizadaparaencriptarmososdadosnamunicipio';

  constructor() { }

  encryptData(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  decryptData(encryptedData: string): any {
    if (!encryptedData) {
      return null; 
    }
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    if (!decryptedData) {
      return null; 
    }
    return JSON.parse(decryptedData);
  }

}
