import * as jspb from 'google-protobuf'

import * as api_common_proto_address_pb from '../../../api/common/proto/address_pb'; // proto import: "api/common/proto/address.proto"


export class Store extends jspb.Message {
  getPrimaryKey(): Store.PrimaryKey | undefined;
  setPrimaryKey(value?: Store.PrimaryKey): Store;
  hasPrimaryKey(): boolean;
  clearPrimaryKey(): Store;

  getWebsiteUrl(): string;
  setWebsiteUrl(value: string): Store;

  getImageUrlsList(): Array<string>;
  setImageUrlsList(value: Array<string>): Store;
  clearImageUrlsList(): Store;
  addImageUrls(value: string, index?: number): Store;

  getName(): string;
  setName(value: string): Store;

  getDescription(): string;
  setDescription(value: string): Store;

  getAddress(): api_common_proto_address_pb.Address | undefined;
  setAddress(value?: api_common_proto_address_pb.Address): Store;
  hasAddress(): boolean;
  clearAddress(): Store;

  getDistanceInMeters(): number;
  setDistanceInMeters(value: number): Store;

  getTimeInMillis(): number;
  setTimeInMillis(value: number): Store;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Store.AsObject;
  static toObject(includeInstance: boolean, msg: Store): Store.AsObject;
  static serializeBinaryToWriter(message: Store, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Store;
  static deserializeBinaryFromReader(message: Store, reader: jspb.BinaryReader): Store;
}

export namespace Store {
  export type AsObject = {
    primaryKey?: Store.PrimaryKey.AsObject,
    websiteUrl: string,
    imageUrlsList: Array<string>,
    name: string,
    description: string,
    address?: api_common_proto_address_pb.Address.AsObject,
    distanceInMeters: number,
    timeInMillis: number,
  }

  export class PrimaryKey extends jspb.Message {
    getStoreId(): number;
    setStoreId(value: number): PrimaryKey;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PrimaryKey.AsObject;
    static toObject(includeInstance: boolean, msg: PrimaryKey): PrimaryKey.AsObject;
    static serializeBinaryToWriter(message: PrimaryKey, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PrimaryKey;
    static deserializeBinaryFromReader(message: PrimaryKey, reader: jspb.BinaryReader): PrimaryKey;
  }

  export namespace PrimaryKey {
    export type AsObject = {
      storeId: number,
    }
  }

}

