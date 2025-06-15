import * as jspb from 'google-protobuf'



export class Brand extends jspb.Message {
  getPrimaryKey(): Brand.PrimaryKey | undefined;
  setPrimaryKey(value?: Brand.PrimaryKey): Brand;
  hasPrimaryKey(): boolean;
  clearPrimaryKey(): Brand;

  getName(): string;
  setName(value: string): Brand;

  getDescription(): string;
  setDescription(value: string): Brand;

  getImageUrlsList(): Array<string>;
  setImageUrlsList(value: Array<string>): Brand;
  clearImageUrlsList(): Brand;
  addImageUrls(value: string, index?: number): Brand;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Brand.AsObject;
  static toObject(includeInstance: boolean, msg: Brand): Brand.AsObject;
  static serializeBinaryToWriter(message: Brand, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Brand;
  static deserializeBinaryFromReader(message: Brand, reader: jspb.BinaryReader): Brand;
}

export namespace Brand {
  export type AsObject = {
    primaryKey?: Brand.PrimaryKey.AsObject,
    name: string,
    description: string,
    imageUrlsList: Array<string>,
  }

  export class PrimaryKey extends jspb.Message {
    getBrandId(): number;
    setBrandId(value: number): PrimaryKey;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PrimaryKey.AsObject;
    static toObject(includeInstance: boolean, msg: PrimaryKey): PrimaryKey.AsObject;
    static serializeBinaryToWriter(message: PrimaryKey, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PrimaryKey;
    static deserializeBinaryFromReader(message: PrimaryKey, reader: jspb.BinaryReader): PrimaryKey;
  }

  export namespace PrimaryKey {
    export type AsObject = {
      brandId: number,
    }
  }

}

