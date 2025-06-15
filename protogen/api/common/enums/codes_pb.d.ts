import * as jspb from 'google-protobuf'



export class Code extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Code.AsObject;
  static toObject(includeInstance: boolean, msg: Code): Code.AsObject;
  static serializeBinaryToWriter(message: Code, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Code;
  static deserializeBinaryFromReader(message: Code, reader: jspb.BinaryReader): Code;
}

export namespace Code {
  export type AsObject = {
  }

  export enum Enum { 
    OK = 0,
    CANCELLED = 1,
    UNKNOWN = 2,
    INVALID_ARGUMENT = 3,
    DEADLINE_EXCEEDED = 4,
    NOT_FOUND = 5,
    ALREADY_EXISTS = 6,
    PERMISSION_DENIED = 7,
    UNAUTHENTICATED = 16,
    RESOURCE_EXHAUSTED = 8,
    FAILED_PRECONDITION = 9,
    ABORTED = 10,
    OUT_OF_RANGE = 11,
    UNIMPLEMENTED = 12,
    INTERNAL = 13,
    UNAVAILABLE = 14,
    DATA_LOSS = 15,
    DO_NOT_USE_RESERVED_FOR_FUTURE_EXPANSION_USE_DEFAULT_IN_SWITCH_INSTEAD_ = 20,
  }
}

