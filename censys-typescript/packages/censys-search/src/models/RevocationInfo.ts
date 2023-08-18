/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type RevocationInfo = {
    revoked?: boolean;
    reason?: RevocationInfo.reason;
    next_update?: string;
    revocation_time?: string;
};

export namespace RevocationInfo {
    export enum reason {
        UNKNOWN = "UNKNOWN",
        UNSPECIFIED = "UNSPECIFIED",
        KEY_COMPROMISE = "KEY_COMPROMISE",
        CA_COMPROMISE = "CA_COMPROMISE",
        AFFILIATION_CHANGED = "AFFILIATION_CHANGED",
        SUPERSEDED = "SUPERSEDED",
        CESSATION_OF_OPERATION = "CESSATION_OF_OPERATION",
        CERTIFICATE_HOLD = "CERTIFICATE_HOLD",
        REMOVE_FROM_CRL = "REMOVE_FROM_CRL",
        PRIVILEGE_WITHDRAWN = "PRIVILEGE_WITHDRAWN",
        AA_COMPROMISE = "AA_COMPROMISE",
    }
}
