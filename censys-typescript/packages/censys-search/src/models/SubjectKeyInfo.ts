/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DSAPublicKey } from "./DSAPublicKey";
import type { ECDSAPublicKey } from "./ECDSAPublicKey";
import type { KeyAlgorithm } from "./KeyAlgorithm";
import type { RSAPublicKey } from "./RSAPublicKey";

export type SubjectKeyInfo = {
    key_algorithm?: KeyAlgorithm;
    key?: RSAPublicKey | DSAPublicKey | ECDSAPublicKey;
    fingerprint_sha256?: string;
};
