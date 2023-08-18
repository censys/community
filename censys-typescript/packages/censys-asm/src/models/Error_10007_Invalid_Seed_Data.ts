/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10007_Invalid_Seed_Data = {
    message: Error_10007_Invalid_Seed_Data.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10007_Invalid_Seed_Data.errorCode;
    /**
     * Additional error details
     */
    details: {
        errors: Array<string>;
    };
};

export namespace Error_10007_Invalid_Seed_Data {
    export enum message {
        INVALID_SEED_DATA = "Invalid Seed Data",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10007" = 10007,
    }
}
