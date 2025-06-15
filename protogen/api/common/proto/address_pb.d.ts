import * as jspb from 'google-protobuf'



export class Address extends jspb.Message {
  getFullAddress(): string;
  setFullAddress(value: string): Address;

  getLatitude(): number;
  setLatitude(value: number): Address;

  getLongitude(): number;
  setLongitude(value: number): Address;

  getPostalCode(): string;
  setPostalCode(value: string): Address;

  getCity(): string;
  setCity(value: string): Address;

  getState(): string;
  setState(value: string): Address;

  getCountry(): string;
  setCountry(value: string): Address;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Address.AsObject;
  static toObject(includeInstance: boolean, msg: Address): Address.AsObject;
  static serializeBinaryToWriter(message: Address, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Address;
  static deserializeBinaryFromReader(message: Address, reader: jspb.BinaryReader): Address;
}

export namespace Address {
  export type AsObject = {
    fullAddress: string,
    latitude: number,
    longitude: number,
    postalCode: string,
    city: string,
    state: string,
    country: string,
  }
}

