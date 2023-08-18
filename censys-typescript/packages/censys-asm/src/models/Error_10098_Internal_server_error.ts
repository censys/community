/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10098_Internal_server_error = {
    message: Error_10098_Internal_server_error.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10098_Internal_server_error.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10098_Internal_server_error {
    export enum message {
        INTERNAL_SERVER_ERROR = "Internal server error",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10098" = 10098,
    }
}
