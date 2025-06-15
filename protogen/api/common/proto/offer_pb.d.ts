import * as jspb from 'google-protobuf'



export class Offer extends jspb.Message {
  getPrimaryKey(): Offer.PrimaryKey | undefined;
  setPrimaryKey(value?: Offer.PrimaryKey): Offer;
  hasPrimaryKey(): boolean;
  clearPrimaryKey(): Offer;

  getDescription(): string;
  setDescription(value: string): Offer;

  getIsActive(): boolean;
  setIsActive(value: boolean): Offer;

  getMultiBuyOffer(): MultiBuyOffer | undefined;
  setMultiBuyOffer(value?: MultiBuyOffer): Offer;
  hasMultiBuyOffer(): boolean;
  clearMultiBuyOffer(): Offer;

  getFlatDiscountOffer(): FlatDiscountOffer | undefined;
  setFlatDiscountOffer(value?: FlatDiscountOffer): Offer;
  hasFlatDiscountOffer(): boolean;
  clearFlatDiscountOffer(): Offer;

  getPercentageOffer(): PercentageOffer | undefined;
  setPercentageOffer(value?: PercentageOffer): Offer;
  hasPercentageOffer(): boolean;
  clearPercentageOffer(): Offer;

  getFixedPriceOffer(): FixedPriceOffer | undefined;
  setFixedPriceOffer(value?: FixedPriceOffer): Offer;
  hasFixedPriceOffer(): boolean;
  clearFixedPriceOffer(): Offer;

  getPriority(): number;
  setPriority(value: number): Offer;

  getStartDate(): string;
  setStartDate(value: string): Offer;

  getEndDate(): string;
  setEndDate(value: string): Offer;

  getOfferCase(): Offer.OfferCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Offer.AsObject;
  static toObject(includeInstance: boolean, msg: Offer): Offer.AsObject;
  static serializeBinaryToWriter(message: Offer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Offer;
  static deserializeBinaryFromReader(message: Offer, reader: jspb.BinaryReader): Offer;
}

export namespace Offer {
  export type AsObject = {
    primaryKey?: Offer.PrimaryKey.AsObject,
    description: string,
    isActive: boolean,
    multiBuyOffer?: MultiBuyOffer.AsObject,
    flatDiscountOffer?: FlatDiscountOffer.AsObject,
    percentageOffer?: PercentageOffer.AsObject,
    fixedPriceOffer?: FixedPriceOffer.AsObject,
    priority: number,
    startDate: string,
    endDate: string,
  }

  export class PrimaryKey extends jspb.Message {
    getOfferId(): string;
    setOfferId(value: string): PrimaryKey;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PrimaryKey.AsObject;
    static toObject(includeInstance: boolean, msg: PrimaryKey): PrimaryKey.AsObject;
    static serializeBinaryToWriter(message: PrimaryKey, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PrimaryKey;
    static deserializeBinaryFromReader(message: PrimaryKey, reader: jspb.BinaryReader): PrimaryKey;
  }

  export namespace PrimaryKey {
    export type AsObject = {
      offerId: string,
    }
  }


  export enum OfferCase { 
    OFFER_NOT_SET = 0,
    MULTI_BUY_OFFER = 4,
    FLAT_DISCOUNT_OFFER = 5,
    PERCENTAGE_OFFER = 6,
    FIXED_PRICE_OFFER = 7,
  }
}

export class MultiBuyOffer extends jspb.Message {
  getMinItems(): number;
  setMinItems(value: number): MultiBuyOffer;

  getFreeItems(): number;
  setFreeItems(value: number): MultiBuyOffer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MultiBuyOffer.AsObject;
  static toObject(includeInstance: boolean, msg: MultiBuyOffer): MultiBuyOffer.AsObject;
  static serializeBinaryToWriter(message: MultiBuyOffer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MultiBuyOffer;
  static deserializeBinaryFromReader(message: MultiBuyOffer, reader: jspb.BinaryReader): MultiBuyOffer;
}

export namespace MultiBuyOffer {
  export type AsObject = {
    minItems: number,
    freeItems: number,
  }
}

export class FlatDiscountOffer extends jspb.Message {
  getMinItems(): number;
  setMinItems(value: number): FlatDiscountOffer;

  getDiscountAmountMicros(): number;
  setDiscountAmountMicros(value: number): FlatDiscountOffer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FlatDiscountOffer.AsObject;
  static toObject(includeInstance: boolean, msg: FlatDiscountOffer): FlatDiscountOffer.AsObject;
  static serializeBinaryToWriter(message: FlatDiscountOffer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FlatDiscountOffer;
  static deserializeBinaryFromReader(message: FlatDiscountOffer, reader: jspb.BinaryReader): FlatDiscountOffer;
}

export namespace FlatDiscountOffer {
  export type AsObject = {
    minItems: number,
    discountAmountMicros: number,
  }
}

export class PercentageOffer extends jspb.Message {
  getMinItems(): number;
  setMinItems(value: number): PercentageOffer;

  getDiscountPercentage(): number;
  setDiscountPercentage(value: number): PercentageOffer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PercentageOffer.AsObject;
  static toObject(includeInstance: boolean, msg: PercentageOffer): PercentageOffer.AsObject;
  static serializeBinaryToWriter(message: PercentageOffer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PercentageOffer;
  static deserializeBinaryFromReader(message: PercentageOffer, reader: jspb.BinaryReader): PercentageOffer;
}

export namespace PercentageOffer {
  export type AsObject = {
    minItems: number,
    discountPercentage: number,
  }
}

export class FixedPriceOffer extends jspb.Message {
  getMinItems(): number;
  setMinItems(value: number): FixedPriceOffer;

  getFixedDiscountedPriceMicros(): number;
  setFixedDiscountedPriceMicros(value: number): FixedPriceOffer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FixedPriceOffer.AsObject;
  static toObject(includeInstance: boolean, msg: FixedPriceOffer): FixedPriceOffer.AsObject;
  static serializeBinaryToWriter(message: FixedPriceOffer, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FixedPriceOffer;
  static deserializeBinaryFromReader(message: FixedPriceOffer, reader: jspb.BinaryReader): FixedPriceOffer;
}

export namespace FixedPriceOffer {
  export type AsObject = {
    minItems: number,
    fixedDiscountedPriceMicros: number,
  }
}

