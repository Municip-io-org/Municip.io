import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})



/**
 * Encryption Service
 *
 * Serviço de criptografia
 *
 */
export class EncryptionService {

  private readonly secretKey = 'estaeapasswordutilizadaparaencriptarmososdadosnamunicipio';


  constructor() { }

  /**
   * Method to encrypt data based on a secret key.
   * @param data
   * @returns Data encrypted
   */
  encryptData(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data), this.secretKey).toString();
  }

  /**
   * Method to decrypt Data based on the input and secret key.
   * @param encryptedData
   * @returns Data decrypted.
   */
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
