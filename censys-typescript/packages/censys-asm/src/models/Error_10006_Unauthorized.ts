/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10006_Unauthorized = {
    message: Error_10006_Unauthorized.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10006_Unauthorized.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10006_Unauthorized {
    export enum message {
        UNAUTHORIZED = "Unauthorized",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10006" = 10006,
    }
}
