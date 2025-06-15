import * as jspb from 'google-protobuf'

import * as api_common_proto_header_pb from '../../../../api/common/proto/header_pb'; // proto import: "api/common/proto/header.proto"


export class GetCartItemsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCartItemsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCartItemsRequest): GetCartItemsRequest.AsObject;
  static serializeBinaryToWriter(message: GetCartItemsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCartItemsRequest;
  static deserializeBinaryFromReader(message: GetCartItemsRequest, reader: jspb.BinaryReader): GetCartItemsRequest;
}

export namespace GetCartItemsRequest {
  export type AsObject = {
  }
}

export class GetCartItemsResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): GetCartItemsResponse;
  hasHeader(): boolean;
  clearHeader(): GetCartItemsResponse;

  getItemsWithQuantityList(): Array<ItemWithQuantity>;
  setItemsWithQuantityList(value: Array<ItemWithQuantity>): GetCartItemsResponse;
  clearItemsWithQuantityList(): GetCartItemsResponse;
  addItemsWithQuantity(value?: ItemWithQuantity, index?: number): ItemWithQuantity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCartItemsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCartItemsResponse): GetCartItemsResponse.AsObject;
  static serializeBinaryToWriter(message: GetCartItemsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCartItemsResponse;
  static deserializeBinaryFromReader(message: GetCartItemsResponse, reader: jspb.BinaryReader): GetCartItemsResponse;
}

export namespace GetCartItemsResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    itemsWithQuantityList: Array<ItemWithQuantity.AsObject>,
  }
}

export class MutateCartRequest extends jspb.Message {
  getItem(): ItemWithQuantity | undefined;
  setItem(value?: ItemWithQuantity): MutateCartRequest;
  hasItem(): boolean;
  clearItem(): MutateCartRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MutateCartRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MutateCartRequest): MutateCartRequest.AsObject;
  static serializeBinaryToWriter(message: MutateCartRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MutateCartRequest;
  static deserializeBinaryFromReader(message: MutateCartRequest, reader: jspb.BinaryReader): MutateCartRequest;
}

export namespace MutateCartRequest {
  export type AsObject = {
    item?: ItemWithQuantity.AsObject,
  }
}

export class MutateCartResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): MutateCartResponse;
  hasHeader(): boolean;
  clearHeader(): MutateCartResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MutateCartResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MutateCartResponse): MutateCartResponse.AsObject;
  static serializeBinaryToWriter(message: MutateCartResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MutateCartResponse;
  static deserializeBinaryFromReader(message: MutateCartResponse, reader: jspb.BinaryReader): MutateCartResponse;
}

export namespace MutateCartResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
  }
}

export class ItemWithQuantity extends jspb.Message {
  getProductVariantId(): number;
  setProductVariantId(value: number): ItemWithQuantity;

  getQuantity(): number;
  setQuantity(value: number): ItemWithQuantity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ItemWithQuantity.AsObject;
  static toObject(includeInstance: boolean, msg: ItemWithQuantity): ItemWithQuantity.AsObject;
  static serializeBinaryToWriter(message: ItemWithQuantity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ItemWithQuantity;
  static deserializeBinaryFromReader(message: ItemWithQuantity, reader: jspb.BinaryReader): ItemWithQuantity;
}

export namespace ItemWithQuantity {
  export type AsObject = {
    productVariantId: number,
    quantity: number,
  }
}

