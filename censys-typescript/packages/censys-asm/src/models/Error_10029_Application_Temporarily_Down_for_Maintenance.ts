/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10029_Application_Temporarily_Down_for_Maintenance = {
    message: Error_10029_Application_Temporarily_Down_for_Maintenance.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10029_Application_Temporarily_Down_for_Maintenance.errorCode;
    /**
     * Additional error details
     */
    details: {
        message: string;
        expectedTimeBackOnline: string | null;
    };
};

export namespace Error_10029_Application_Temporarily_Down_for_Maintenance {
    export enum message {
        APPLICATION_TEMPORARILY_DOWN_FOR_MAINTENANCE = "Application Temporarily Down for Maintenance",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10029" = 10029,
    }
}
