import * as jspb from 'google-protobuf'

import * as api_common_proto_header_pb from '../../../../api/common/proto/header_pb'; // proto import: "api/common/proto/header.proto"


export class PlaceOrderRequest extends jspb.Message {
  getProductVariantsWithQuantityList(): Array<ProductVariantWithQuantity>;
  setProductVariantsWithQuantityList(value: Array<ProductVariantWithQuantity>): PlaceOrderRequest;
  clearProductVariantsWithQuantityList(): PlaceOrderRequest;
  addProductVariantsWithQuantity(value?: ProductVariantWithQuantity, index?: number): ProductVariantWithQuantity;

  getCustomerAddressLinkId(): number;
  setCustomerAddressLinkId(value: number): PlaceOrderRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlaceOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PlaceOrderRequest): PlaceOrderRequest.AsObject;
  static serializeBinaryToWriter(message: PlaceOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlaceOrderRequest;
  static deserializeBinaryFromReader(message: PlaceOrderRequest, reader: jspb.BinaryReader): PlaceOrderRequest;
}

export namespace PlaceOrderRequest {
  export type AsObject = {
    productVariantsWithQuantityList: Array<ProductVariantWithQuantity.AsObject>,
    customerAddressLinkId: number,
  }
}

export class PlaceOrderResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): PlaceOrderResponse;
  hasHeader(): boolean;
  clearHeader(): PlaceOrderResponse;

  getOrderNumber(): string;
  setOrderNumber(value: string): PlaceOrderResponse;

  getRazorpayOrderId(): string;
  setRazorpayOrderId(value: string): PlaceOrderResponse;

  getAmountMicros(): number;
  setAmountMicros(value: number): PlaceOrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlaceOrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: PlaceOrderResponse): PlaceOrderResponse.AsObject;
  static serializeBinaryToWriter(message: PlaceOrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlaceOrderResponse;
  static deserializeBinaryFromReader(message: PlaceOrderResponse, reader: jspb.BinaryReader): PlaceOrderResponse;
}

export namespace PlaceOrderResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    orderNumber: string,
    razorpayOrderId: string,
    amountMicros: number,
  }
}

export class ProductVariantWithQuantity extends jspb.Message {
  getProductVariantId(): number;
  setProductVariantId(value: number): ProductVariantWithQuantity;

  getQuantity(): number;
  setQuantity(value: number): ProductVariantWithQuantity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductVariantWithQuantity.AsObject;
  static toObject(includeInstance: boolean, msg: ProductVariantWithQuantity): ProductVariantWithQuantity.AsObject;
  static serializeBinaryToWriter(message: ProductVariantWithQuantity, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductVariantWithQuantity;
  static deserializeBinaryFromReader(message: ProductVariantWithQuantity, reader: jspb.BinaryReader): ProductVariantWithQuantity;
}

export namespace ProductVariantWithQuantity {
  export type AsObject = {
    productVariantId: number,
    quantity: number,
  }
}

export class ConfirmPaymentRequest extends jspb.Message {
  getRazorpayOrderId(): string;
  setRazorpayOrderId(value: string): ConfirmPaymentRequest;

  getRazorpayPaymentId(): string;
  setRazorpayPaymentId(value: string): ConfirmPaymentRequest;

  getRazorpaySignature(): string;
  setRazorpaySignature(value: string): ConfirmPaymentRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfirmPaymentRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ConfirmPaymentRequest): ConfirmPaymentRequest.AsObject;
  static serializeBinaryToWriter(message: ConfirmPaymentRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfirmPaymentRequest;
  static deserializeBinaryFromReader(message: ConfirmPaymentRequest, reader: jspb.BinaryReader): ConfirmPaymentRequest;
}

export namespace ConfirmPaymentRequest {
  export type AsObject = {
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string,
  }
}

export class ConfirmPaymentResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): ConfirmPaymentResponse;
  hasHeader(): boolean;
  clearHeader(): ConfirmPaymentResponse;

  getSuccess(): boolean;
  setSuccess(value: boolean): ConfirmPaymentResponse;

  getOrderNumber(): string;
  setOrderNumber(value: string): ConfirmPaymentResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConfirmPaymentResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ConfirmPaymentResponse): ConfirmPaymentResponse.AsObject;
  static serializeBinaryToWriter(message: ConfirmPaymentResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConfirmPaymentResponse;
  static deserializeBinaryFromReader(message: ConfirmPaymentResponse, reader: jspb.BinaryReader): ConfirmPaymentResponse;
}

export namespace ConfirmPaymentResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    success: boolean,
    orderNumber: string,
  }
}

