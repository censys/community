/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10034_Tag_Color_Too_Long = {
    message: Error_10034_Tag_Color_Too_Long.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10034_Tag_Color_Too_Long.errorCode;
    /**
     * Additional error details
     */
    details: {
        maxLength: number;
        offendingColor: string;
    };
};

export namespace Error_10034_Tag_Color_Too_Long {
    export enum message {
        TAG_COLOR_TOO_LONG = "Tag Color Too Long",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10034" = 10034,
    }
}
