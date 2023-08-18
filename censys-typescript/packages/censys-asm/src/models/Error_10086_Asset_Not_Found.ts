/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10086_Asset_Not_Found = {
    message: Error_10086_Asset_Not_Found.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10086_Asset_Not_Found.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10086_Asset_Not_Found {
    export enum message {
        ASSET_NOT_FOUND = "Asset Not Found",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10086" = 10086,
    }
}
