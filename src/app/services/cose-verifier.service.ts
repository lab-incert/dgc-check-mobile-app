import { Injectable } from '@angular/core';
import { Certificate } from '../x509/x509.js';

import { SCHEMA } from '../../resources/json/DGC-all-schemas-combined';

const rawHash = require("sha256-uint8array").createHash;

const zlib = require('pako');
var cbor = require('cbor-js');
var sign = require('../cose-js/sign.js');
var validate = require('jsonschema').validate;

/* TODO CHECK IF WE HAVE A BETTER WAY TO IMPORT */
declare var require: any;
//declare const Buffer;
const base45 = require("../../../node_modules/base45-js/lib/base45-js.js");

@Injectable({
  providedIn: 'root'
})
export class CoseVerifierService {

  public PREFIX: string = 'HC1:';

  constructor() {}

  verify(data) {
    
    data = this.removePrefix(data);
    data = base45.decode(data);

    console.log(data.toString());

    // Zlib magic headers:
    // 78 01 - No Compression/low
    // 78 9C - Default Compression
    // 78 DA - Best Compression
    if (data[0] == 0x78) {
      data = zlib.inflate(new Uint8Array(data));
    }

    console.log(data);

    // Sample PEM
    const cert = Certificate.fromPEM(Buffer.from(
      '-----BEGIN CERTIFICATE-----\n' +
      'MIIBTzCB9wICBAAwCgYIKoZIzj0EAwIwMjEjMCEGA1UEAwwaTmF0aW9uYWwgQ1ND' +
      'QSBvZiBGcmllc2xhbmQxCzAJBgNVBAYTAkZSMB4XDTIxMDQwOTE0NDQwNloXDTI2' +
      'MDIyMjE0NDQwNlowNjEnMCUGA1UEAwweRFNDIG51bWJlciB3b3JrZXIgb2YgRnJp' +
      'ZXNsYW5kMQswCQYDVQQGEwJGUjBZMBMGByqGSM49AgEGCCqGSM49AwEHA0IABEqE' +
      'TwFm0zBqGRsHa8HtaUGWWrWQLUtSMxM+JKA/B+tLJWd4HsnC3/TkthvoKB+/riwa' +
      'ZhC1OM6EXNm7yiXOmZAwCgYIKoZIzj0EAwIDRwAwRAIgTojM9oJ3XYVK6pjOouiV' +
      '1jLRa/Go6MH9DE3dRC05mSUCIFJkVcQ4d5/zbhlvX6lhGDpXTRBI+IMM0eBTjp8K' +
      'RoSQ\n' +
      '-----END CERTIFICATE-----\n'
    ));

    var bytes = new Uint8Array(cert.raw);

    const fingerprint = rawHash().update(cert.raw).digest();
    const keyID = fingerprint.slice(0,8)

    // Highly ES256 specific - extract the 'X' and 'Y' for verification
    //
    let pk = cert.publicKey.keyRaw
    const keyB = Buffer.from(pk.slice(0, 1))
    const keyX = Buffer.from(pk.slice(1, 1+32))
    const keyY = Buffer.from(pk.slice(33,33+32))

    const verifier = { 'key': { 'x': keyX, 'y': keyY,  'kid': keyID } };

    console.log(verifier);

    return sign.verify(data, verifier)
    .then((buf) => {
      let decoded = cbor.decode(this.typedArrayToBuffer(buf));
      console.log(JSON.stringify(decoded, null, 5));

      return decoded;
    });
  }

  validateSchema(json) {
    console.log('Schema validation');
    let result = validate(json, SCHEMA);
    console.log(result);

    return result;
  }

  getCwtHeaderData(data) {
    data = this.removePrefix(data);
    data = base45.decode(data);
    console.log(data);
    if (data[0] == 0x78) {
      data = zlib.inflate(new Uint8Array(data));
    }
    if (data === undefined) {
      throw Error('Data badly compressed');
    }
    console.log(data.toString());
    let [p, u, plaintext, signers] = cbor.decode(this.typedArrayToBuffer(data));
    var cwt = cbor.decode(this.typedArrayToBuffer(plaintext));
    console.log(JSON.stringify(cwt, null, 5));

    return cwt;
  }

  typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
  }

  removePrefix(data) {
    if (data.startsWith(this.PREFIX)) {
      return data.substring(this.PREFIX.length);
    } else {
      return data;
    }
  }
}
