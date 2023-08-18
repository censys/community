/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10061_Object_storage_asset_not_found = {
    message: Error_10061_Object_storage_asset_not_found.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10061_Object_storage_asset_not_found.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10061_Object_storage_asset_not_found {
    export enum message {
        OBJECT_STORAGE_ASSET_NOT_FOUND = "Object storage asset not found",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10061" = 10061,
    }
}
