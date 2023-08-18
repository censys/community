/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10000_API_Key_Missing = {
    message: Error_10000_API_Key_Missing.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10000_API_Key_Missing.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10000_API_Key_Missing {
    export enum message {
        API_KEY_MISSING = "API Key Missing",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10000" = 10000,
    }
}
