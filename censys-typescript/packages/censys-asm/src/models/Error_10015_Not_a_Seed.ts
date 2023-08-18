/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10015_Not_a_Seed = {
    message: Error_10015_Not_a_Seed.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10015_Not_a_Seed.errorCode;
    /**
     * Additional error details
     */
    details: Array<{
        id?: number;
        value?: string | number;
    }>;
};

export namespace Error_10015_Not_a_Seed {
    export enum message {
        NOT_A_SEED = "Not a Seed",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10015" = 10015,
    }
}
