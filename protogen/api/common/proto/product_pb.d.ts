import * as jspb from 'google-protobuf'

import * as api_common_proto_offer_pb from '../../../api/common/proto/offer_pb'; // proto import: "api/common/proto/offer.proto"
import * as api_common_proto_store_pb from '../../../api/common/proto/store_pb'; // proto import: "api/common/proto/store.proto"


export class Product extends jspb.Message {
  getPrimaryKey(): Product.PrimaryKey | undefined;
  setPrimaryKey(value?: Product.PrimaryKey): Product;
  hasPrimaryKey(): boolean;
  clearPrimaryKey(): Product;

  getBrandId(): number;
  setBrandId(value: number): Product;

  getBrandName(): string;
  setBrandName(value: string): Product;

  getMinDiscountedPriceProductVariant(): ProductVariantWithStore | undefined;
  setMinDiscountedPriceProductVariant(value?: ProductVariantWithStore): Product;
  hasMinDiscountedPriceProductVariant(): boolean;
  clearMinDiscountedPriceProductVariant(): Product;

  getOffersList(): Array<api_common_proto_offer_pb.Offer>;
  setOffersList(value: Array<api_common_proto_offer_pb.Offer>): Product;
  clearOffersList(): Product;
  addOffers(value?: api_common_proto_offer_pb.Offer, index?: number): api_common_proto_offer_pb.Offer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Product.AsObject;
  static toObject(includeInstance: boolean, msg: Product): Product.AsObject;
  static serializeBinaryToWriter(message: Product, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Product;
  static deserializeBinaryFromReader(message: Product, reader: jspb.BinaryReader): Product;
}

export namespace Product {
  export type AsObject = {
    primaryKey?: Product.PrimaryKey.AsObject,
    brandId: number,
    brandName: string,
    minDiscountedPriceProductVariant?: ProductVariantWithStore.AsObject,
    offersList: Array<api_common_proto_offer_pb.Offer.AsObject>,
  }

  export class PrimaryKey extends jspb.Message {
    getProductId(): number;
    setProductId(value: number): PrimaryKey;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PrimaryKey.AsObject;
    static toObject(includeInstance: boolean, msg: PrimaryKey): PrimaryKey.AsObject;
    static serializeBinaryToWriter(message: PrimaryKey, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PrimaryKey;
    static deserializeBinaryFromReader(message: PrimaryKey, reader: jspb.BinaryReader): PrimaryKey;
  }

  export namespace PrimaryKey {
    export type AsObject = {
      productId: number,
    }
  }

}

export class ProductVariant extends jspb.Message {
  getProductVariantId(): number;
  setProductVariantId(value: number): ProductVariant;

  getName(): string;
  setName(value: string): ProductVariant;

  getDescription(): string;
  setDescription(value: string): ProductVariant;

  getImageUrl(): string;
  setImageUrl(value: string): ProductVariant;

  getColorId(): number;
  setColorId(value: number): ProductVariant;

  getColorName(): string;
  setColorName(value: string): ProductVariant;

  getSizeId(): number;
  setSizeId(value: number): ProductVariant;

  getSizeName(): string;
  setSizeName(value: string): ProductVariant;

  getMrpMicros(): number;
  setMrpMicros(value: number): ProductVariant;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductVariant.AsObject;
  static toObject(includeInstance: boolean, msg: ProductVariant): ProductVariant.AsObject;
  static serializeBinaryToWriter(message: ProductVariant, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductVariant;
  static deserializeBinaryFromReader(message: ProductVariant, reader: jspb.BinaryReader): ProductVariant;
}

export namespace ProductVariant {
  export type AsObject = {
    productVariantId: number,
    name: string,
    description: string,
    imageUrl: string,
    colorId: number,
    colorName: string,
    sizeId: number,
    sizeName: string,
    mrpMicros: number,
  }
}

export class ProductVariantWithStore extends jspb.Message {
  getProductVariant(): ProductVariant | undefined;
  setProductVariant(value?: ProductVariant): ProductVariantWithStore;
  hasProductVariant(): boolean;
  clearProductVariant(): ProductVariantWithStore;

  getStoreWithBestPrice(): api_common_proto_store_pb.Store | undefined;
  setStoreWithBestPrice(value?: api_common_proto_store_pb.Store): ProductVariantWithStore;
  hasStoreWithBestPrice(): boolean;
  clearStoreWithBestPrice(): ProductVariantWithStore;

  getDiscountedPriceMicros(): number;
  setDiscountedPriceMicros(value: number): ProductVariantWithStore;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductVariantWithStore.AsObject;
  static toObject(includeInstance: boolean, msg: ProductVariantWithStore): ProductVariantWithStore.AsObject;
  static serializeBinaryToWriter(message: ProductVariantWithStore, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductVariantWithStore;
  static deserializeBinaryFromReader(message: ProductVariantWithStore, reader: jspb.BinaryReader): ProductVariantWithStore;
}

export namespace ProductVariantWithStore {
  export type AsObject = {
    productVariant?: ProductVariant.AsObject,
    storeWithBestPrice?: api_common_proto_store_pb.Store.AsObject,
    discountedPriceMicros: number,
  }
}

export class ProductDetails extends jspb.Message {
  getProductId(): number;
  setProductId(value: number): ProductDetails;

  getBrandId(): number;
  setBrandId(value: number): ProductDetails;

  getBrandName(): string;
  setBrandName(value: string): ProductDetails;

  getColorsList(): Array<Color>;
  setColorsList(value: Array<Color>): ProductDetails;
  clearColorsList(): ProductDetails;
  addColors(value?: Color, index?: number): Color;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ProductDetails.AsObject;
  static toObject(includeInstance: boolean, msg: ProductDetails): ProductDetails.AsObject;
  static serializeBinaryToWriter(message: ProductDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ProductDetails;
  static deserializeBinaryFromReader(message: ProductDetails, reader: jspb.BinaryReader): ProductDetails;
}

export namespace ProductDetails {
  export type AsObject = {
    productId: number,
    brandId: number,
    brandName: string,
    colorsList: Array<Color.AsObject>,
  }
}

export class Color extends jspb.Message {
  getColorId(): number;
  setColorId(value: number): Color;

  getColorName(): string;
  setColorName(value: string): Color;

  getProductImageUrlsList(): Array<string>;
  setProductImageUrlsList(value: Array<string>): Color;
  clearProductImageUrlsList(): Color;
  addProductImageUrls(value: string, index?: number): Color;

  getSizesList(): Array<Size>;
  setSizesList(value: Array<Size>): Color;
  clearSizesList(): Color;
  addSizes(value?: Size, index?: number): Size;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Color.AsObject;
  static toObject(includeInstance: boolean, msg: Color): Color.AsObject;
  static serializeBinaryToWriter(message: Color, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Color;
  static deserializeBinaryFromReader(message: Color, reader: jspb.BinaryReader): Color;
}

export namespace Color {
  export type AsObject = {
    colorId: number,
    colorName: string,
    productImageUrlsList: Array<string>,
    sizesList: Array<Size.AsObject>,
  }
}

export class Size extends jspb.Message {
  getSizeId(): number;
  setSizeId(value: number): Size;

  getSizeName(): string;
  setSizeName(value: string): Size;

  getProductVariantId(): number;
  setProductVariantId(value: number): Size;

  getProductVariantName(): string;
  setProductVariantName(value: string): Size;

  getProductVariantDescription(): string;
  setProductVariantDescription(value: string): Size;

  getMrpMicros(): number;
  setMrpMicros(value: number): Size;

  getStoreWithBestPrice(): api_common_proto_store_pb.Store | undefined;
  setStoreWithBestPrice(value?: api_common_proto_store_pb.Store): Size;
  hasStoreWithBestPrice(): boolean;
  clearStoreWithBestPrice(): Size;

  getDiscountedPriceMircos(): number;
  setDiscountedPriceMircos(value: number): Size;

  getQuantity(): number;
  setQuantity(value: number): Size;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Size.AsObject;
  static toObject(includeInstance: boolean, msg: Size): Size.AsObject;
  static serializeBinaryToWriter(message: Size, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Size;
  static deserializeBinaryFromReader(message: Size, reader: jspb.BinaryReader): Size;
}

export namespace Size {
  export type AsObject = {
    sizeId: number,
    sizeName: string,
    productVariantId: number,
    productVariantName: string,
    productVariantDescription: string,
    mrpMicros: number,
    storeWithBestPrice?: api_common_proto_store_pb.Store.AsObject,
    discountedPriceMircos: number,
    quantity: number,
  }
}

