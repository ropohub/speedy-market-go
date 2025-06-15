import * as jspb from 'google-protobuf'

import * as api_common_proto_brand_pb from '../../../../api/common/proto/brand_pb'; // proto import: "api/common/proto/brand.proto"
import * as api_common_proto_header_pb from '../../../../api/common/proto/header_pb'; // proto import: "api/common/proto/header.proto"


export class GetBrandRequest extends jspb.Message {
  getHeader(): api_common_proto_header_pb.RequestHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.RequestHeader): GetBrandRequest;
  hasHeader(): boolean;
  clearHeader(): GetBrandRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBrandRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBrandRequest): GetBrandRequest.AsObject;
  static serializeBinaryToWriter(message: GetBrandRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBrandRequest;
  static deserializeBinaryFromReader(message: GetBrandRequest, reader: jspb.BinaryReader): GetBrandRequest;
}

export namespace GetBrandRequest {
  export type AsObject = {
    header?: api_common_proto_header_pb.RequestHeader.AsObject,
  }
}

export class GetBrandResponse extends jspb.Message {
  getHeader(): api_common_proto_header_pb.ResponseHeader | undefined;
  setHeader(value?: api_common_proto_header_pb.ResponseHeader): GetBrandResponse;
  hasHeader(): boolean;
  clearHeader(): GetBrandResponse;

  getBrandsList(): Array<api_common_proto_brand_pb.Brand>;
  setBrandsList(value: Array<api_common_proto_brand_pb.Brand>): GetBrandResponse;
  clearBrandsList(): GetBrandResponse;
  addBrands(value?: api_common_proto_brand_pb.Brand, index?: number): api_common_proto_brand_pb.Brand;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBrandResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBrandResponse): GetBrandResponse.AsObject;
  static serializeBinaryToWriter(message: GetBrandResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBrandResponse;
  static deserializeBinaryFromReader(message: GetBrandResponse, reader: jspb.BinaryReader): GetBrandResponse;
}

export namespace GetBrandResponse {
  export type AsObject = {
    header?: api_common_proto_header_pb.ResponseHeader.AsObject,
    brandsList: Array<api_common_proto_brand_pb.Brand.AsObject>,
  }
}

