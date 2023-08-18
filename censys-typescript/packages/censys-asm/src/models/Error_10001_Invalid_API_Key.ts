/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10001_Invalid_API_Key = {
    message: Error_10001_Invalid_API_Key.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10001_Invalid_API_Key.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10001_Invalid_API_Key {
    export enum message {
        INVALID_API_KEY = "Invalid API Key",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10001" = 10001,
    }
}
