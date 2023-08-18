/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10048_Customer_not_Found = {
    message: Error_10048_Customer_not_Found.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10048_Customer_not_Found.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10048_Customer_not_Found {
    export enum message {
        CUSTOMER_NOT_FOUND = "Customer not Found",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10048" = 10048,
    }
}
