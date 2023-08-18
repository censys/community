/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10018_Host_not_Found = {
    message: Error_10018_Host_not_Found.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10018_Host_not_Found.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10018_Host_not_Found {
    export enum message {
        HOST_NOT_FOUND = "Host not Found",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10018" = 10018,
    }
}
