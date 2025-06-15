import * as jspb from 'google-protobuf'

import * as api_common_proto_filter_pb from '../../../../api/common/proto/filter_pb'; // proto import: "api/common/proto/filter.proto"
import * as api_common_proto_header_pb from '../../../../api/common/proto/header_pb'; // proto import: "api/common/proto/header.proto"
import * as api_common_proto_product_pb from '../../../../api/common/proto/product_pb'; // proto import: "api/common/proto/product.proto"
import * as api_common_proto_store_pb from '../../../../api/common/proto/store_pb'; // proto import: "api/common/proto/store.proto"


export class GetStoreRequest extends jspb.Message {
  getHeader(): api_common_proto_header_pb.RequestHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.RequestHeader): GetStoreRequest;
  hasHeader(): boolean;
  clearHeader(): GetStoreRequest;

  getSelectorsList(): Array<StoreSelector>;
  setSelectorsList(value: Array<StoreSelector>): GetStoreRequest;
  clearSelectorsList(): GetStoreRequest;
  addSelectors(value?: StoreSelector, index?: number): StoreSelector;

  getOrderByList(): Array<GetStoreRequest.OrderBy>;
  setOrderByList(value: Array<GetStoreRequest.OrderBy>): GetStoreRequest;
  clearOrderByList(): GetStoreRequest;
  addOrderBy(value?: GetStoreRequest.OrderBy, index?: number): GetStoreRequest.OrderBy;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStoreRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetStoreRequest): GetStoreRequest.AsObject;
  static serializeBinaryToWriter(message: GetStoreRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStoreRequest;
  static deserializeBinaryFromReader(message: GetStoreRequest, reader: jspb.BinaryReader): GetStoreRequest;
}

export namespace GetStoreRequest {
  export type AsObject = {
    header?: api_common_proto_header_pb.RequestHeader.AsObject,
    selectorsList: Array<StoreSelector.AsObject>,
    orderByList: Array<GetStoreRequest.OrderBy.AsObject>,
  }

  export class OrderBy extends jspb.Message {
    getField(): Field.Enum;
    setField(value: Field.Enum): OrderBy;

    getDescending(): boolean;
    setDescending(value: boolean): OrderBy;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OrderBy.AsObject;
    static toObject(includeInstance: boolean, msg: OrderBy): OrderBy.AsObject;
    static serializeBinaryToWriter(message: OrderBy, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OrderBy;
    static deserializeBinaryFromReader(message: OrderBy, reader: jspb.BinaryReader): OrderBy;
  }

  export namespace OrderBy {
    export type AsObject = {
      field: Field.Enum,
      descending: boolean,
    }
  }

}

export class GetStoreResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): GetStoreResponse;
  hasHeader(): boolean;
  clearHeader(): GetStoreResponse;

  getStoresList(): Array<api_common_proto_store_pb.Store>;
  setStoresList(value: Array<api_common_proto_store_pb.Store>): GetStoreResponse;
  clearStoresList(): GetStoreResponse;
  addStores(value?: api_common_proto_store_pb.Store, index?: number): api_common_proto_store_pb.Store;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStoreResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetStoreResponse): GetStoreResponse.AsObject;
  static serializeBinaryToWriter(message: GetStoreResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStoreResponse;
  static deserializeBinaryFromReader(message: GetStoreResponse, reader: jspb.BinaryReader): GetStoreResponse;
}

export namespace GetStoreResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    storesList: Array<api_common_proto_store_pb.Store.AsObject>,
  }
}

export class GetStorePriceForProductRequest extends jspb.Message {
  getHeader(): api_common_proto_header_pb.RequestHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.RequestHeader): GetStorePriceForProductRequest;
  hasHeader(): boolean;
  clearHeader(): GetStorePriceForProductRequest;

  getProductKey(): api_common_proto_product_pb.Product.PrimaryKey | undefined;
  setProductKey(value?: api_common_proto_product_pb.Product.PrimaryKey): GetStorePriceForProductRequest;
  hasProductKey(): boolean;
  clearProductKey(): GetStorePriceForProductRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStorePriceForProductRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetStorePriceForProductRequest): GetStorePriceForProductRequest.AsObject;
  static serializeBinaryToWriter(message: GetStorePriceForProductRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStorePriceForProductRequest;
  static deserializeBinaryFromReader(message: GetStorePriceForProductRequest, reader: jspb.BinaryReader): GetStorePriceForProductRequest;
}

export namespace GetStorePriceForProductRequest {
  export type AsObject = {
    header?: api_common_proto_header_pb.RequestHeader.AsObject,
    productKey?: api_common_proto_product_pb.Product.PrimaryKey.AsObject,
  }
}

export class GetStorePriceForProductResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): GetStorePriceForProductResponse;
  hasHeader(): boolean;
  clearHeader(): GetStorePriceForProductResponse;

  getStorePricesList(): Array<GetStorePriceForProductResponse.StorePrice>;
  setStorePricesList(value: Array<GetStorePriceForProductResponse.StorePrice>): GetStorePriceForProductResponse;
  clearStorePricesList(): GetStorePriceForProductResponse;
  addStorePrices(value?: GetStorePriceForProductResponse.StorePrice, index?: number): GetStorePriceForProductResponse.StorePrice;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStorePriceForProductResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetStorePriceForProductResponse): GetStorePriceForProductResponse.AsObject;
  static serializeBinaryToWriter(message: GetStorePriceForProductResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStorePriceForProductResponse;
  static deserializeBinaryFromReader(message: GetStorePriceForProductResponse, reader: jspb.BinaryReader): GetStorePriceForProductResponse;
}

export namespace GetStorePriceForProductResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    storePricesList: Array<GetStorePriceForProductResponse.StorePrice.AsObject>,
  }

  export class StorePrice extends jspb.Message {
    getStore(): api_common_proto_store_pb.Store | undefined;
    setStore(value?: api_common_proto_store_pb.Store): StorePrice;
    hasStore(): boolean;
    clearStore(): StorePrice;

    getDiscountedPriceMicros(): number;
    setDiscountedPriceMicros(value: number): StorePrice;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorePrice.AsObject;
    static toObject(includeInstance: boolean, msg: StorePrice): StorePrice.AsObject;
    static serializeBinaryToWriter(message: StorePrice, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorePrice;
    static deserializeBinaryFromReader(message: StorePrice, reader: jspb.BinaryReader): StorePrice;
  }

  export namespace StorePrice {
    export type AsObject = {
      store?: api_common_proto_store_pb.Store.AsObject,
      discountedPriceMicros: number,
    }
  }

}

export class StoreSelector extends jspb.Message {
  getField(): Field.Enum;
  setField(value: Field.Enum): StoreSelector;

  getFilter(): api_common_proto_filter_pb.Filter | undefined;
  setFilter(value?: api_common_proto_filter_pb.Filter): StoreSelector;
  hasFilter(): boolean;
  clearFilter(): StoreSelector;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StoreSelector.AsObject;
  static toObject(includeInstance: boolean, msg: StoreSelector): StoreSelector.AsObject;
  static serializeBinaryToWriter(message: StoreSelector, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StoreSelector;
  static deserializeBinaryFromReader(message: StoreSelector, reader: jspb.BinaryReader): StoreSelector;
}

export namespace StoreSelector {
  export type AsObject = {
    field: Field.Enum,
    filter?: api_common_proto_filter_pb.Filter.AsObject,
  }
}

export class Field extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Field.AsObject;
  static toObject(includeInstance: boolean, msg: Field): Field.AsObject;
  static serializeBinaryToWriter(message: Field, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Field;
  static deserializeBinaryFromReader(message: Field, reader: jspb.BinaryReader): Field;
}

export namespace Field {
  export type AsObject = {
  }

  export enum Enum { 
    UNKNOWN = 0,
    STORE_KEY = 1,
    BRAND_KEY = 2,
    PRODUCT_KEY = 3,
    GENDER = 4,
    CATEGORY = 5,
    RATING = 6,
    DISCOUNT_PERCENTAGE = 7,
    DISTANCE = 8,
  }
}

