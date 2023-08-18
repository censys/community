/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10096_Search_API_timeout = {
    message: Error_10096_Search_API_timeout.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10096_Search_API_timeout.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10096_Search_API_timeout {
    export enum message {
        SEARCH_API_TIMEOUT = "Search API timeout",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10096" = 10096,
    }
}
