/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10060_Invalid_object_storage_asset_identifier = {
    message: Error_10060_Invalid_object_storage_asset_identifier.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10060_Invalid_object_storage_asset_identifier.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10060_Invalid_object_storage_asset_identifier {
    export enum message {
        INVALID_OBJECT_STORAGE_ASSET_IDENTIFIER = "Invalid object storage asset identifier",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10060" = 10060,
    }
}
