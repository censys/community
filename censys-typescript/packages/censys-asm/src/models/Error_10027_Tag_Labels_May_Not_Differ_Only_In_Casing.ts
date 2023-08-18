/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10027_Tag_Labels_May_Not_Differ_Only_In_Casing = {
    message: Error_10027_Tag_Labels_May_Not_Differ_Only_In_Casing.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10027_Tag_Labels_May_Not_Differ_Only_In_Casing.errorCode;
    /**
     * Additional error details
     */
    details: {
        label: string;
        similarLabels: Array<string>;
    };
};

export namespace Error_10027_Tag_Labels_May_Not_Differ_Only_In_Casing {
    export enum message {
        TAG_LABELS_MAY_NOT_DIFFER_ONLY_IN_CASING = "Tag Labels May Not Differ Only In Casing",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10027" = 10027,
    }
}
