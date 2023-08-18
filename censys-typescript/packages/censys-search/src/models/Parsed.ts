/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DistinguishedName } from "./DistinguishedName";
import type { Extension } from "./Extension";
import type { KeyAlgorithm } from "./KeyAlgorithm";
import type { SubjectKeyInfo } from "./SubjectKeyInfo";

export type Parsed = {
    version?: number;
    serial_number?: string;
    issuer_dn?: string;
    issuer?: DistinguishedName;
    subject_dn?: string;
    subject?: DistinguishedName;
    subject_key_info?: SubjectKeyInfo;
    validity_period?: {
        not_before?: string;
        not_after?: string;
        length_seconds?: number;
    };
    signature?: {
        signature_algorithm?: KeyAlgorithm;
        value?: string;
        valid?: boolean;
        self_signed?: boolean;
    };
    extensions?: {
        key_usage?: any;
        basic_constraints?: any;
        subject_alt_name?: any;
        issuer_alt_name?: any;
        name_constraints?: any;
        crl_distribution_points?: Array<string>;
        authority_key_id?: string;
        subject_key_id?: string;
        extended_key_usage?: any;
        certificate_policies?: Array<any>;
        authority_info_access?: any;
        ct_poison?: boolean;
        signed_certificate_timestamps?: Array<any>;
        tor_service_descriptors?: Array<any>;
        cabf_organization_id?: any;
        qc_statements?: any;
    };
    unknown_extensions?: Array<Extension>;
    redacted?: boolean;
};
