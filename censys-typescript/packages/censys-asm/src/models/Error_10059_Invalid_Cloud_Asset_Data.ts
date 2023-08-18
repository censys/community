/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10059_Invalid_Cloud_Asset_Data = {
    message: Error_10059_Invalid_Cloud_Asset_Data.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10059_Invalid_Cloud_Asset_Data.errorCode;
    /**
     * Additional error details
     */
    details: {
        errors: Array<string>;
    };
};

export namespace Error_10059_Invalid_Cloud_Asset_Data {
    export enum message {
        INVALID_CLOUD_ASSET_DATA = "Invalid Cloud Asset Data",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10059" = 10059,
    }
}
