/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10014_Unable_to_Find_Seed = {
    message: Error_10014_Unable_to_Find_Seed.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10014_Unable_to_Find_Seed.errorCode;
    /**
     * Additional error details
     */
    details: Array<{
        id?: number;
        value?: string | number;
    }>;
};

export namespace Error_10014_Unable_to_Find_Seed {
    export enum message {
        UNABLE_TO_FIND_SEED = "Unable to Find Seed",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10014" = 10014,
    }
}
