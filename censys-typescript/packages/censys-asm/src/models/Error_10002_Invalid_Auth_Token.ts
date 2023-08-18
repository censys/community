/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10002_Invalid_Auth_Token = {
    message: Error_10002_Invalid_Auth_Token.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10002_Invalid_Auth_Token.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10002_Invalid_Auth_Token {
    export enum message {
        INVALID_AUTH_TOKEN = "Invalid Auth Token",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10002" = 10002,
    }
}
