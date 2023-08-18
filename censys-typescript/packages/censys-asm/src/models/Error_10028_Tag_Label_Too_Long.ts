/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10028_Tag_Label_Too_Long = {
    message: Error_10028_Tag_Label_Too_Long.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10028_Tag_Label_Too_Long.errorCode;
    /**
     * Additional error details
     */
    details: {
        maxLength: number;
        offendingTag: string;
    };
};

export namespace Error_10028_Tag_Label_Too_Long {
    export enum message {
        TAG_LABEL_TOO_LONG = "Tag Label Too Long",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10028" = 10028,
    }
}
