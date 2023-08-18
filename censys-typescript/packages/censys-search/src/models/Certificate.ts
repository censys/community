/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Certificate = {
    parsed?: {
        fingerprint_sha1?: string;
        fingerprint_sha256?: string;
        fingerprint_md5?: string;
        serial_number?: string;
        subject_key_info?: any;
        names?: Array<string>;
        subject_dn?: string;
        subject?: any;
        issuer_dn?: string;
        issuer?: any;
        signature?: any;
        redacted?: boolean;
        validity?: any;
        version?: number;
        extensions?: any;
    };
    ct?: any;
};
