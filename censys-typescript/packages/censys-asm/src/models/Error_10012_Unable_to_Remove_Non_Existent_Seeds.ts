/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10012_Unable_to_Remove_Non_Existent_Seeds = {
    message: Error_10012_Unable_to_Remove_Non_Existent_Seeds.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10012_Unable_to_Remove_Non_Existent_Seeds.errorCode;
    /**
     * Additional error details
     */
    details: {
        nodes: Array<string | number>;
        reason: string;
    };
};

export namespace Error_10012_Unable_to_Remove_Non_Existent_Seeds {
    export enum message {
        UNABLE_TO_REMOVE_NON_EXISTENT_SEEDS = "Unable to Remove Non-Existent Seeds",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10012" = 10012,
    }
}
