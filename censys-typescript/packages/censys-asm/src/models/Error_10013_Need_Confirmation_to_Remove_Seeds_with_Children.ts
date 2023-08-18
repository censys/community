/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10013_Need_Confirmation_to_Remove_Seeds_with_Children = {
    message: Error_10013_Need_Confirmation_to_Remove_Seeds_with_Children.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10013_Need_Confirmation_to_Remove_Seeds_with_Children.errorCode;
    /**
     * Additional error details
     */
    details: {
        seeds: Array<{
            seed: string | number;
            children: Array<string | number>;
        }>;
        reason: string;
    };
};

export namespace Error_10013_Need_Confirmation_to_Remove_Seeds_with_Children {
    export enum message {
        NEED_CONFIRMATION_TO_REMOVE_SEEDS_WITH_CHILDREN = "Need Confirmation to Remove Seeds with Children",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10013" = 10013,
    }
}
