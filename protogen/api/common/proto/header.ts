// @generated by protobuf-ts 2.11.0
// @generated from protobuf file "api/common/proto/header.proto" (package "api.common.proto", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
import { Code_Enum } from "../enums/codes";
import { Address } from "./address";
/**
 * RequestHeader represents the header of a request.
 *
 * @generated from protobuf message api.common.proto.RequestHeader
 */
export interface RequestHeader {
    /**
     * Address of the customer.
     *
     * @generated from protobuf field: api.common.proto.Address customer_address = 1
     */
    customerAddress?: Address;
}
/**
 * ResponseHeader represents the header of a response.
 *
 * @generated from protobuf message api.common.proto.ResponseHeader
 */
export interface ResponseHeader {
    /**
     * @generated from protobuf field: api.common.enums.Code.Enum status = 1
     */
    status: Code_Enum;
}
// @generated message type with reflection information, may provide speed optimized methods
class RequestHeader$Type extends MessageType<RequestHeader> {
    constructor() {
        super("api.common.proto.RequestHeader", [
            { no: 1, name: "customer_address", kind: "message", T: () => Address }
        ]);
    }
    create(value?: PartialMessage<RequestHeader>): RequestHeader {
        const message = globalThis.Object.create((this.messagePrototype!));
        if (value !== undefined)
            reflectionMergePartial<RequestHeader>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RequestHeader): RequestHeader {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* api.common.proto.Address customer_address */ 1:
                    message.customerAddress = Address.internalBinaryRead(reader, reader.uint32(), options, message.customerAddress);
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: RequestHeader, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* api.common.proto.Address customer_address = 1; */
        if (message.customerAddress)
            Address.internalBinaryWrite(message.customerAddress, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message api.common.proto.RequestHeader
 */
export const RequestHeader = new RequestHeader$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ResponseHeader$Type extends MessageType<ResponseHeader> {
    constructor() {
        super("api.common.proto.ResponseHeader", [
            { no: 1, name: "status", kind: "enum", T: () => ["api.common.enums.Code.Enum", Code_Enum] }
        ]);
    }
    create(value?: PartialMessage<ResponseHeader>): ResponseHeader {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.status = 0;
        if (value !== undefined)
            reflectionMergePartial<ResponseHeader>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: ResponseHeader): ResponseHeader {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* api.common.enums.Code.Enum status */ 1:
                    message.status = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: ResponseHeader, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* api.common.enums.Code.Enum status = 1; */
        if (message.status !== 0)
            writer.tag(1, WireType.Varint).int32(message.status);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message api.common.proto.ResponseHeader
 */
export const ResponseHeader = new ResponseHeader$Type();
