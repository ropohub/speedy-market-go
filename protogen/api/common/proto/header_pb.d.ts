import * as jspb from 'google-protobuf'

import * as api_common_proto_address_pb from '../../../api/common/proto/address_pb'; // proto import: "api/common/proto/address.proto"
import * as api_common_enums_codes_pb from '../../../api/common/enums/codes_pb'; // proto import: "api/common/enums/codes.proto"


export class RequestHeader extends jspb.Message {
  getCustomerAddress(): api_common_proto_address_pb.Address | undefined;
  setCustomerAddress(value?: api_common_proto_address_pb.Address): RequestHeader;
  hasCustomerAddress(): boolean;
  clearCustomerAddress(): RequestHeader;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestHeader.AsObject;
  static toObject(includeInstance: boolean, msg: RequestHeader): RequestHeader.AsObject;
  static serializeBinaryToWriter(message: RequestHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestHeader;
  static deserializeBinaryFromReader(message: RequestHeader, reader: jspb.BinaryReader): RequestHeader;
}

export namespace RequestHeader {
  export type AsObject = {
    customerAddress?: api_common_proto_address_pb.Address.AsObject,
  }
}

export class ResponseHeader extends jspb.Message {
  getStatus(): api_common_enums_codes_pb.Code.Enum;
  setStatus(value: api_common_enums_codes_pb.Code.Enum): ResponseHeader;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResponseHeader.AsObject;
  static toObject(includeInstance: boolean, msg: ResponseHeader): ResponseHeader.AsObject;
  static serializeBinaryToWriter(message: ResponseHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResponseHeader;
  static deserializeBinaryFromReader(message: ResponseHeader, reader: jspb.BinaryReader): ResponseHeader;
}

export namespace ResponseHeader {
  export type AsObject = {
    status: api_common_enums_codes_pb.Code.Enum,
  }
}

