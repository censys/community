/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10097_Search_API_error = {
    message: Error_10097_Search_API_error.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10097_Search_API_error.errorCode;
    /**
     * Additional error details
     */
    details: {
        message: string;
        statusCode: number;
    };
};

export namespace Error_10097_Search_API_error {
    export enum message {
        SEARCH_API_ERROR = "Search API error",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10097" = 10097,
    }
}
