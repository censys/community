/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10020_Certificate_not_Found = {
    message: Error_10020_Certificate_not_Found.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10020_Certificate_not_Found.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10020_Certificate_not_Found {
    export enum message {
        CERTIFICATE_NOT_FOUND = "Certificate not Found",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10020" = 10020,
    }
}
