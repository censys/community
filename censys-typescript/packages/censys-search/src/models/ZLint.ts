/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ZLint = {
    version?: number;
    timestamp?: string;
    notices_present?: boolean;
    warnings_present?: boolean;
    errors_present?: boolean;
    fatals_present?: boolean;
    failed_lints?: Array<string>;
};
