/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CT } from "./CT";
import type { Parsed } from "./Parsed";
import type { RevocationInfo } from "./RevocationInfo";
import type { RootStore } from "./RootStore";
import type { ZLint } from "./ZLint";

export type CertificateV2 = {
    fingerprint_sha256?: string;
    fingerprint_sha1?: string;
    fingerprint_md5?: string;
    tbs_fingerprint_sha256?: string;
    tbs_no_ct_fingerprint_sha256?: string;
    spki_fingerprint_sha256?: string;
    parent_spki_fingerprint_sha256?: string;
    parsed?: Parsed;
    precert?: boolean;
    revoked?: boolean;
    names?: Array<string>;
    validation_level?: CertificateV2.validation_level;
    validation?: {
        nss?: RootStore;
        microsoft?: RootStore;
        apple?: RootStore;
        chrome?: RootStore;
    };
    revocation?: {
        ocsp?: RevocationInfo;
        crl?: RevocationInfo;
    };
    ct?: CT;
    ever_seen_in_scan?: boolean;
    raw?: string;
    added_at?: string;
    modified_at?: string;
    validated_at?: string;
    parse_status?: CertificateV2.parse_status;
    zlint?: ZLint;
    labels?: Array<string>;
};

export namespace CertificateV2 {
    export enum validation_level {
        UNKNOWN = "UNKNOWN",
        DV = "DV",
        OV = "OV",
        EV = "EV",
    }

    export enum parse_status {
        CERTIFICATE_PARSE_STATUS_UNKNOWN = "CERTIFICATE_PARSE_STATUS_UNKNOWN",
        CERTIFICATE_PARSE_STATUS_SUCCESS = "CERTIFICATE_PARSE_STATUS_SUCCESS",
        CERTIFICATE_PARSE_STATUS_FAIL = "CERTIFICATE_PARSE_STATUS_FAIL",
        CERTIFICATE_PARSE_STATUS_CORRUPTED = "CERTIFICATE_PARSE_STATUS_CORRUPTED",
    }
}
