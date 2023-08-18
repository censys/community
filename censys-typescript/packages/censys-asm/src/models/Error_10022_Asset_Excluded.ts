/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Error_10022_Asset_Excluded = {
    message: Error_10022_Asset_Excluded.message;
    /**
     * Unique identifer for this error
     */
    errorCode: Error_10022_Asset_Excluded.errorCode;
    /**
     * Additional error details
     */
    details: string;
};

export namespace Error_10022_Asset_Excluded {
    export enum message {
        ASSET_EXCLUDED = "Asset Excluded",
    }

    /**
     * Unique identifer for this error
     */
    export enum errorCode {
        "_10022" = 10022,
    }
}
