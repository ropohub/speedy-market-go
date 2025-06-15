import * as jspb from 'google-protobuf'



export class GenderPB extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenderPB.AsObject;
  static toObject(includeInstance: boolean, msg: GenderPB): GenderPB.AsObject;
  static serializeBinaryToWriter(message: GenderPB, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenderPB;
  static deserializeBinaryFromReader(message: GenderPB, reader: jspb.BinaryReader): GenderPB;
}

export namespace GenderPB {
  export type AsObject = {
  }

  export enum Enum { 
    UNKNOWN = 0,
    MALE = 1,
    FEMALE = 2,
    NEUTRAL = 3,
  }
}

