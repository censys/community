/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10036_Tag_Color_Must_Not_Have_Trailing_or_Leading_Whitespace =
    {
        message: Error_10036_Tag_Color_Must_Not_Have_Trailing_or_Leading_Whitespace.message;
        /**
         * Unique identifer for this error
         */
        errorCode: Error_10036_Tag_Color_Must_Not_Have_Trailing_or_Leading_Whitespace.errorCode;
        /**
         * Additional error details
         */
        details: {
            offendingColor: string;
        };
    };

export namespace Error_10036_Tag_Color_Must_Not_Have_Trailing_or_Leading_Whitespace {
    export enum message {
        TAG_COLOR_MUST_NOT_HAVE_TRAILING_OR_LEADING_WHITESPACE = "Tag Color Must Not Have Trailing or Leading Whitespace",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10036" = 10036,
    }
}
