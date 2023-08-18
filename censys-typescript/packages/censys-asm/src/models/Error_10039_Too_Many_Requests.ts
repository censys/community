/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10039_Too_Many_Requests = {
    message: Error_10039_Too_Many_Requests.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10039_Too_Many_Requests.errorCode;
    /**
     * Additional error details
     */
    details: {
        /**
         * You may make up to this many requests
         * every ${period} amount of time.
         */
        maxRequests: number;
        /**
         * The period in second over which you many
         * make up to ${maxRequests}.
         */
        period: number;
        message: string;
    };
};

export namespace Error_10039_Too_Many_Requests {
    export enum message {
        TOO_MANY_REQUESTS = "Too Many Requests",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10039" = 10039,
    }
}
