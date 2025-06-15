import * as jspb from 'google-protobuf'

import * as api_common_proto_header_pb from '../../../../api/common/proto/header_pb'; // proto import: "api/common/proto/header.proto"
import * as api_common_proto_address_pb from '../../../../api/common/proto/address_pb'; // proto import: "api/common/proto/address.proto"


export class GetCustomerRequest extends jspb.Message {
  getHeader(): api_common_proto_header_pb.RequestHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.RequestHeader): GetCustomerRequest;
  hasHeader(): boolean;
  clearHeader(): GetCustomerRequest;

  getPhoneNumber(): string;
  setPhoneNumber(value: string): GetCustomerRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCustomerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCustomerRequest): GetCustomerRequest.AsObject;
  static serializeBinaryToWriter(message: GetCustomerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCustomerRequest;
  static deserializeBinaryFromReader(message: GetCustomerRequest, reader: jspb.BinaryReader): GetCustomerRequest;
}

export namespace GetCustomerRequest {
  export type AsObject = {
    header?: api_common_proto_header_pb.RequestHeader.AsObject,
    phoneNumber: string,
  }
}

export class GetCustomerResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): GetCustomerResponse;
  hasHeader(): boolean;
  clearHeader(): GetCustomerResponse;

  getOrderRecieversList(): Array<OrderReciever>;
  setOrderRecieversList(value: Array<OrderReciever>): GetCustomerResponse;
  clearOrderRecieversList(): GetCustomerResponse;
  addOrderRecievers(value?: OrderReciever, index?: number): OrderReciever;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCustomerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCustomerResponse): GetCustomerResponse.AsObject;
  static serializeBinaryToWriter(message: GetCustomerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCustomerResponse;
  static deserializeBinaryFromReader(message: GetCustomerResponse, reader: jspb.BinaryReader): GetCustomerResponse;
}

export namespace GetCustomerResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    orderRecieversList: Array<OrderReciever.AsObject>,
  }
}

export class AddCustomerAddressRequest extends jspb.Message {
  getHeader(): api_common_proto_header_pb.RequestHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.RequestHeader): AddCustomerAddressRequest;
  hasHeader(): boolean;
  clearHeader(): AddCustomerAddressRequest;

  getOrderReciever(): OrderReciever | undefined;
  setOrderReciever(value?: OrderReciever): AddCustomerAddressRequest;
  hasOrderReciever(): boolean;
  clearOrderReciever(): AddCustomerAddressRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddCustomerAddressRequest.AsObject;
  static toObject(includeInstance: boolean, msg: AddCustomerAddressRequest): AddCustomerAddressRequest.AsObject;
  static serializeBinaryToWriter(message: AddCustomerAddressRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddCustomerAddressRequest;
  static deserializeBinaryFromReader(message: AddCustomerAddressRequest, reader: jspb.BinaryReader): AddCustomerAddressRequest;
}

export namespace AddCustomerAddressRequest {
  export type AsObject = {
    header?: api_common_proto_header_pb.RequestHeader.AsObject,
    orderReciever?: OrderReciever.AsObject,
  }
}

export class AddCustomerAddressResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): AddCustomerAddressResponse;
  hasHeader(): boolean;
  clearHeader(): AddCustomerAddressResponse;

  getCustomerAddressLinkId(): number;
  setCustomerAddressLinkId(value: number): AddCustomerAddressResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddCustomerAddressResponse.AsObject;
  static toObject(includeInstance: boolean, msg: AddCustomerAddressResponse): AddCustomerAddressResponse.AsObject;
  static serializeBinaryToWriter(message: AddCustomerAddressResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddCustomerAddressResponse;
  static deserializeBinaryFromReader(message: AddCustomerAddressResponse, reader: jspb.BinaryReader): AddCustomerAddressResponse;
}

export namespace AddCustomerAddressResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    customerAddressLinkId: number,
  }
}

export class OrderReciever extends jspb.Message {
  getRecieverAddress(): api_common_proto_address_pb.Address | undefined;
  setRecieverAddress(value?: api_common_proto_address_pb.Address): OrderReciever;
  hasRecieverAddress(): boolean;
  clearRecieverAddress(): OrderReciever;

  getHouseNumberAndFloor(): string;
  setHouseNumberAndFloor(value: string): OrderReciever;

  getReceiverName(): string;
  setReceiverName(value: string): OrderReciever;

  getRecieverPhoneNumber(): string;
  setRecieverPhoneNumber(value: string): OrderReciever;

  getCustomerAddressLinkId(): number;
  setCustomerAddressLinkId(value: number): OrderReciever;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderReciever.AsObject;
  static toObject(includeInstance: boolean, msg: OrderReciever): OrderReciever.AsObject;
  static serializeBinaryToWriter(message: OrderReciever, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderReciever;
  static deserializeBinaryFromReader(message: OrderReciever, reader: jspb.BinaryReader): OrderReciever;
}

export namespace OrderReciever {
  export type AsObject = {
    recieverAddress?: api_common_proto_address_pb.Address.AsObject,
    houseNumberAndFloor: string,
    receiverName: string,
    recieverPhoneNumber: string,
    customerAddressLinkId: number,
  }
}

