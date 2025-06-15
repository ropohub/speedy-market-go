import * as jspb from 'google-protobuf'



export class ProductCategoryPB extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductCategoryPB.AsObject;
  static toObject(includeInstance: boolean, msg: ProductCategoryPB): ProductCategoryPB.AsObject;
  static serializeBinaryToWriter(message: ProductCategoryPB, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductCategoryPB;
  static deserializeBinaryFromReader(message: ProductCategoryPB, reader: jspb.BinaryReader): ProductCategoryPB;
}

export namespace ProductCategoryPB {
  export type AsObject = {
  }

  export enum Enum { 
    UNKNOWN = 0,
    SHIRT = 1,
    PANTS = 2,
    JEANS = 3,
  }
}

