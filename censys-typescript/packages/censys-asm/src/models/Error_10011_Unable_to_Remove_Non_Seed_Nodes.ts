/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10011_Unable_to_Remove_Non_Seed_Nodes = {
    message: Error_10011_Unable_to_Remove_Non_Seed_Nodes.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10011_Unable_to_Remove_Non_Seed_Nodes.errorCode;
    /**
     * Additional error details
     */
    details: {
        nodes: Array<string | number>;
        reason: string;
    };
};

export namespace Error_10011_Unable_to_Remove_Non_Seed_Nodes {
    export enum message {
        UNABLE_TO_REMOVE_NON_SEED_NODES = "Unable to Remove Non-Seed Nodes",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10011" = 10011,
    }
}
