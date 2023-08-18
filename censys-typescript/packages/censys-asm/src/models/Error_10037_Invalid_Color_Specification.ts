/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10037_Invalid_Color_Specification = {
    message: Error_10037_Invalid_Color_Specification.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10037_Invalid_Color_Specification.errorCode;
    /**
     * Additional error details
     */
    details: {
        color: string;
    };
};

export namespace Error_10037_Invalid_Color_Specification {
    export enum message {
        INVALID_COLOR_SPECIFICATION = "Invalid Color Specification",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10037" = 10037,
    }
}
