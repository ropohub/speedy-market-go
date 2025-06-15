import * as jspb from 'google-protobuf'



export class Filter extends jspb.Message {
  getOperator(): Filter.Operator;
  setOperator(value: Filter.Operator): Filter;

  getValue(): Value | undefined;
  setValue(value?: Value): Filter;
  hasValue(): boolean;
  clearValue(): Filter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Filter.AsObject;
  static toObject(includeInstance: boolean, msg: Filter): Filter.AsObject;
  static serializeBinaryToWriter(message: Filter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Filter;
  static deserializeBinaryFromReader(message: Filter, reader: jspb.BinaryReader): Filter;
}

export namespace Filter {
  export type AsObject = {
    operator: Filter.Operator,
    value?: Value.AsObject,
  }

  export enum Operator { 
    UNKNOWN = 0,
    EQUALS = 1,
    NOT_EQUALS = 2,
    IN = 3,
    NOT_IN = 4,
    GREATHER_THAN = 5,
    GREATHER_THAN_OR_EQUALS = 6,
    LESS_THAN = 7,
    LESS_THAN_OR_EQUALS = 8,
    IS_NULL = 9,
    IS_NOT_NULL = 10,
    CONTAINS_ANY = 11,
    CONTAINS_ALL = 12,
    CONTAINS_NONE = 13,
    NOT_EMPTY = 14,
  }
}

export class Value extends jspb.Message {
  getBoolValue(): boolean;
  setBoolValue(value: boolean): Value;
  hasBoolValue(): boolean;
  clearBoolValue(): Value;

  getStringValue(): string;
  setStringValue(value: string): Value;
  hasStringValue(): boolean;
  clearStringValue(): Value;

  getInt64Value(): number;
  setInt64Value(value: number): Value;
  hasInt64Value(): boolean;
  clearInt64Value(): Value;

  getUint64Value(): number;
  setUint64Value(value: number): Value;
  hasUint64Value(): boolean;
  clearUint64Value(): Value;

  getFloatValue(): number;
  setFloatValue(value: number): Value;
  hasFloatValue(): boolean;
  clearFloatValue(): Value;

  getDoubleValue(): number;
  setDoubleValue(value: number): Value;
  hasDoubleValue(): boolean;
  clearDoubleValue(): Value;

  getBytesValue(): Uint8Array | string;
  getBytesValue_asU8(): Uint8Array;
  getBytesValue_asB64(): string;
  setBytesValue(value: Uint8Array | string): Value;
  hasBytesValue(): boolean;
  clearBytesValue(): Value;

  getBoolList(): BoolList | undefined;
  setBoolList(value?: BoolList): Value;
  hasBoolList(): boolean;
  clearBoolList(): Value;

  getStringList(): StringList | undefined;
  setStringList(value?: StringList): Value;
  hasStringList(): boolean;
  clearStringList(): Value;

  getInt64List(): Int64List | undefined;
  setInt64List(value?: Int64List): Value;
  hasInt64List(): boolean;
  clearInt64List(): Value;

  getUint64List(): Uint64Values | undefined;
  setUint64List(value?: Uint64Values): Value;
  hasUint64List(): boolean;
  clearUint64List(): Value;

  getFloatList(): FloatList | undefined;
  setFloatList(value?: FloatList): Value;
  hasFloatList(): boolean;
  clearFloatList(): Value;

  getDoubleList(): DoubleList | undefined;
  setDoubleList(value?: DoubleList): Value;
  hasDoubleList(): boolean;
  clearDoubleList(): Value;

  getBytesList(): BytesList | undefined;
  setBytesList(value?: BytesList): Value;
  hasBytesList(): boolean;
  clearBytesList(): Value;

  getValueCase(): Value.ValueCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Value.AsObject;
  static toObject(includeInstance: boolean, msg: Value): Value.AsObject;
  static serializeBinaryToWriter(message: Value, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Value;
  static deserializeBinaryFromReader(message: Value, reader: jspb.BinaryReader): Value;
}

export namespace Value {
  export type AsObject = {
    boolValue?: boolean,
    stringValue?: string,
    int64Value?: number,
    uint64Value?: number,
    floatValue?: number,
    doubleValue?: number,
    bytesValue?: Uint8Array | string,
    boolList?: BoolList.AsObject,
    stringList?: StringList.AsObject,
    int64List?: Int64List.AsObject,
    uint64List?: Uint64Values.AsObject,
    floatList?: FloatList.AsObject,
    doubleList?: DoubleList.AsObject,
    bytesList?: BytesList.AsObject,
  }

  export enum ValueCase { 
    VALUE_NOT_SET = 0,
    BOOL_VALUE = 1,
    STRING_VALUE = 2,
    INT64_VALUE = 3,
    UINT64_VALUE = 4,
    FLOAT_VALUE = 5,
    DOUBLE_VALUE = 6,
    BYTES_VALUE = 7,
    BOOL_LIST = 8,
    STRING_LIST = 9,
    INT64_LIST = 10,
    UINT64_LIST = 11,
    FLOAT_LIST = 12,
    DOUBLE_LIST = 13,
    BYTES_LIST = 14,
  }
}

export class BoolList extends jspb.Message {
  getBoolValuesList(): Array<boolean>;
  setBoolValuesList(value: Array<boolean>): BoolList;
  clearBoolValuesList(): BoolList;
  addBoolValues(value: boolean, index?: number): BoolList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BoolList.AsObject;
  static toObject(includeInstance: boolean, msg: BoolList): BoolList.AsObject;
  static serializeBinaryToWriter(message: BoolList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BoolList;
  static deserializeBinaryFromReader(message: BoolList, reader: jspb.BinaryReader): BoolList;
}

export namespace BoolList {
  export type AsObject = {
    boolValuesList: Array<boolean>,
  }
}

export class StringList extends jspb.Message {
  getStringValuesList(): Array<string>;
  setStringValuesList(value: Array<string>): StringList;
  clearStringValuesList(): StringList;
  addStringValues(value: string, index?: number): StringList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StringList.AsObject;
  static toObject(includeInstance: boolean, msg: StringList): StringList.AsObject;
  static serializeBinaryToWriter(message: StringList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StringList;
  static deserializeBinaryFromReader(message: StringList, reader: jspb.BinaryReader): StringList;
}

export namespace StringList {
  export type AsObject = {
    stringValuesList: Array<string>,
  }
}

export class Int64List extends jspb.Message {
  getInt64ValuesList(): Array<number>;
  setInt64ValuesList(value: Array<number>): Int64List;
  clearInt64ValuesList(): Int64List;
  addInt64Values(value: number, index?: number): Int64List;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Int64List.AsObject;
  static toObject(includeInstance: boolean, msg: Int64List): Int64List.AsObject;
  static serializeBinaryToWriter(message: Int64List, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Int64List;
  static deserializeBinaryFromReader(message: Int64List, reader: jspb.BinaryReader): Int64List;
}

export namespace Int64List {
  export type AsObject = {
    int64ValuesList: Array<number>,
  }
}

export class Uint64Values extends jspb.Message {
  getUint64ValuesList(): Array<number>;
  setUint64ValuesList(value: Array<number>): Uint64Values;
  clearUint64ValuesList(): Uint64Values;
  addUint64Values(value: number, index?: number): Uint64Values;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Uint64Values.AsObject;
  static toObject(includeInstance: boolean, msg: Uint64Values): Uint64Values.AsObject;
  static serializeBinaryToWriter(message: Uint64Values, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Uint64Values;
  static deserializeBinaryFromReader(message: Uint64Values, reader: jspb.BinaryReader): Uint64Values;
}

export namespace Uint64Values {
  export type AsObject = {
    uint64ValuesList: Array<number>,
  }
}

export class FloatList extends jspb.Message {
  getFloatValuesList(): Array<number>;
  setFloatValuesList(value: Array<number>): FloatList;
  clearFloatValuesList(): FloatList;
  addFloatValues(value: number, index?: number): FloatList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FloatList.AsObject;
  static toObject(includeInstance: boolean, msg: FloatList): FloatList.AsObject;
  static serializeBinaryToWriter(message: FloatList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FloatList;
  static deserializeBinaryFromReader(message: FloatList, reader: jspb.BinaryReader): FloatList;
}

export namespace FloatList {
  export type AsObject = {
    floatValuesList: Array<number>,
  }
}

export class DoubleList extends jspb.Message {
  getDoubleValuesList(): Array<number>;
  setDoubleValuesList(value: Array<number>): DoubleList;
  clearDoubleValuesList(): DoubleList;
  addDoubleValues(value: number, index?: number): DoubleList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DoubleList.AsObject;
  static toObject(includeInstance: boolean, msg: DoubleList): DoubleList.AsObject;
  static serializeBinaryToWriter(message: DoubleList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DoubleList;
  static deserializeBinaryFromReader(message: DoubleList, reader: jspb.BinaryReader): DoubleList;
}

export namespace DoubleList {
  export type AsObject = {
    doubleValuesList: Array<number>,
  }
}

export class BytesList extends jspb.Message {
  getBytesValuesList(): Array<Uint8Array | string>;
  setBytesValuesList(value: Array<Uint8Array | string>): BytesList;
  clearBytesValuesList(): BytesList;
  addBytesValues(value: Uint8Array | string, index?: number): BytesList;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BytesList.AsObject;
  static toObject(includeInstance: boolean, msg: BytesList): BytesList.AsObject;
  static serializeBinaryToWriter(message: BytesList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BytesList;
  static deserializeBinaryFromReader(message: BytesList, reader: jspb.BinaryReader): BytesList;
}

export namespace BytesList {
  export type AsObject = {
    bytesValuesList: Array<Uint8Array | string>,
  }
}

