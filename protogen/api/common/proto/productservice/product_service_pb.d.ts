import * as jspb from 'google-protobuf'

import * as api_common_proto_filter_pb from '../../../../api/common/proto/filter_pb'; // proto import: "api/common/proto/filter.proto"
import * as api_common_proto_header_pb from '../../../../api/common/proto/header_pb'; // proto import: "api/common/proto/header.proto"
import * as api_common_proto_product_pb from '../../../../api/common/proto/product_pb'; // proto import: "api/common/proto/product.proto"
import * as api_common_proto_category_pb from '../../../../api/common/proto/category_pb'; // proto import: "api/common/proto/category.proto"


export class GetCategorySetRequest extends jspb.Message {
  getHeader(): api_common_proto_header_pb.RequestHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.RequestHeader): GetCategorySetRequest;
  hasHeader(): boolean;
  clearHeader(): GetCategorySetRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCategorySetRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetCategorySetRequest): GetCategorySetRequest.AsObject;
  static serializeBinaryToWriter(message: GetCategorySetRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCategorySetRequest;
  static deserializeBinaryFromReader(message: GetCategorySetRequest, reader: jspb.BinaryReader): GetCategorySetRequest;
}

export namespace GetCategorySetRequest {
  export type AsObject = {
    header?: api_common_proto_header_pb.RequestHeader.AsObject,
  }
}

export class GetCategorySetResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): GetCategorySetResponse;
  hasHeader(): boolean;
  clearHeader(): GetCategorySetResponse;

  getCategorySet(): api_common_proto_category_pb.CategorySet | undefined;
  setCategorySet(value?: api_common_proto_category_pb.CategorySet): GetCategorySetResponse;
  hasCategorySet(): boolean;
  clearCategorySet(): GetCategorySetResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetCategorySetResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetCategorySetResponse): GetCategorySetResponse.AsObject;
  static serializeBinaryToWriter(message: GetCategorySetResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetCategorySetResponse;
  static deserializeBinaryFromReader(message: GetCategorySetResponse, reader: jspb.BinaryReader): GetCategorySetResponse;
}

export namespace GetCategorySetResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    categorySet?: api_common_proto_category_pb.CategorySet.AsObject,
  }
}

export class GetProductDetailsRequest extends jspb.Message {
  getHeader(): api_common_proto_header_pb.RequestHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.RequestHeader): GetProductDetailsRequest;
  hasHeader(): boolean;
  clearHeader(): GetProductDetailsRequest;

  getProductId(): number;
  setProductId(value: number): GetProductDetailsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProductDetailsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProductDetailsRequest): GetProductDetailsRequest.AsObject;
  static serializeBinaryToWriter(message: GetProductDetailsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProductDetailsRequest;
  static deserializeBinaryFromReader(message: GetProductDetailsRequest, reader: jspb.BinaryReader): GetProductDetailsRequest;
}

export namespace GetProductDetailsRequest {
  export type AsObject = {
    header?: api_common_proto_header_pb.RequestHeader.AsObject,
    productId: number,
  }
}

export class GetProductDetailsResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): GetProductDetailsResponse;
  hasHeader(): boolean;
  clearHeader(): GetProductDetailsResponse;

  getProductDetails(): api_common_proto_product_pb.ProductDetails | undefined;
  setProductDetails(value?: api_common_proto_product_pb.ProductDetails): GetProductDetailsResponse;
  hasProductDetails(): boolean;
  clearProductDetails(): GetProductDetailsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProductDetailsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProductDetailsResponse): GetProductDetailsResponse.AsObject;
  static serializeBinaryToWriter(message: GetProductDetailsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProductDetailsResponse;
  static deserializeBinaryFromReader(message: GetProductDetailsResponse, reader: jspb.BinaryReader): GetProductDetailsResponse;
}

export namespace GetProductDetailsResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    productDetails?: api_common_proto_product_pb.ProductDetails.AsObject,
  }
}

export class GetProductRequest extends jspb.Message {
  getHeader(): api_common_proto_header_pb.RequestHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.RequestHeader): GetProductRequest;
  hasHeader(): boolean;
  clearHeader(): GetProductRequest;

  getSearchQuery(): string;
  setSearchQuery(value: string): GetProductRequest;

  getSelectorsList(): Array<ProductSelector>;
  setSelectorsList(value: Array<ProductSelector>): GetProductRequest;
  clearSelectorsList(): GetProductRequest;
  addSelectors(value?: ProductSelector, index?: number): ProductSelector;

  getOrderByList(): Array<GetProductRequest.OrderBy>;
  setOrderByList(value: Array<GetProductRequest.OrderBy>): GetProductRequest;
  clearOrderByList(): GetProductRequest;
  addOrderBy(value?: GetProductRequest.OrderBy, index?: number): GetProductRequest.OrderBy;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProductRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProductRequest): GetProductRequest.AsObject;
  static serializeBinaryToWriter(message: GetProductRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProductRequest;
  static deserializeBinaryFromReader(message: GetProductRequest, reader: jspb.BinaryReader): GetProductRequest;
}

export namespace GetProductRequest {
  export type AsObject = {
    header?: api_common_proto_header_pb.RequestHeader.AsObject,
    searchQuery: string,
    selectorsList: Array<ProductSelector.AsObject>,
    orderByList: Array<GetProductRequest.OrderBy.AsObject>,
  }

  export class OrderBy extends jspb.Message {
    getSelector(): Field.Enum;
    setSelector(value: Field.Enum): OrderBy;

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
      selector: Field.Enum,
      descending: boolean,
    }
  }

}

export class GetProductResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): GetProductResponse;
  hasHeader(): boolean;
  clearHeader(): GetProductResponse;

  getProductsList(): Array<api_common_proto_product_pb.Product>;
  setProductsList(value: Array<api_common_proto_product_pb.Product>): GetProductResponse;
  clearProductsList(): GetProductResponse;
  addProducts(value?: api_common_proto_product_pb.Product, index?: number): api_common_proto_product_pb.Product;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProductResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetProductResponse): GetProductResponse.AsObject;
  static serializeBinaryToWriter(message: GetProductResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProductResponse;
  static deserializeBinaryFromReader(message: GetProductResponse, reader: jspb.BinaryReader): GetProductResponse;
}

export namespace GetProductResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    productsList: Array<api_common_proto_product_pb.Product.AsObject>,
  }
}

export class ProductSelector extends jspb.Message {
  getField(): Field.Enum;
  setField(value: Field.Enum): ProductSelector;

  getFilter(): api_common_proto_filter_pb.Filter | undefined;
  setFilter(value?: api_common_proto_filter_pb.Filter): ProductSelector;
  hasFilter(): boolean;
  clearFilter(): ProductSelector;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductSelector.AsObject;
  static toObject(includeInstance: boolean, msg: ProductSelector): ProductSelector.AsObject;
  static serializeBinaryToWriter(message: ProductSelector, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductSelector;
  static deserializeBinaryFromReader(message: ProductSelector, reader: jspb.BinaryReader): ProductSelector;
}

export namespace ProductSelector {
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
    PRODUCT_KEY = 1,
    BRAND_KEY = 2,
    STORE_KEY = 3,
    PRODUCT_VARIANT_KEY = 4,
    GENDER = 5,
    CATEGORY = 6,
    RATING = 7,
    DISCOUNT_PRICE_MICROS = 8,
    DISCOUNT_PERCENTAGE = 9,
    DISTANCE = 10,
    OFFER = 11,
    FROM_DELIVERY_PARTNERS = 12,
    CATEGORY_ID = 13,
  }
}

