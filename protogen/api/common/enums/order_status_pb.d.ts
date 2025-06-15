import * as jspb from 'google-protobuf'



export class OrderStatus extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderStatus.AsObject;
  static toObject(includeInstance: boolean, msg: OrderStatus): OrderStatus.AsObject;
  static serializeBinaryToWriter(message: OrderStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderStatus;
  static deserializeBinaryFromReader(message: OrderStatus, reader: jspb.BinaryReader): OrderStatus;
}

export namespace OrderStatus {
  export type AsObject = {
  }

  export enum Enum { 
    UNKNOWN = 0,
    ORDER_PLACED = 1,
    DELIVERY_PARTNER_ASSIGNED = 2,
    PICKED = 3,
    DELIVERED = 4,
    WAITING = 5,
    REFUND_PENDING = 6,
    COMPLETED = 7,
  }
}

