/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Chains } from "./Chains";

export type RootStore = {
    is_valid?: boolean;
    /**
     * True if the certificate is valid now or was ever valid in the past.
     */
    ever_valid?: boolean;
    /**
     * True if there exists a path from the certificate to the root store.
     */
    has_trusted_path?: boolean;
    /**
     * True if now or at some point in the past there existed a path from the certificate to the root store.
     */
    had_trusted_path?: boolean;
    chains?: Chains;
    /**
     * SHA256 fingerprints of immediate parents
     */
    parents?: Array<string>;
    /**
     * True if the certificate is in the revocation set (e.g. OneCRL) associated with this root store.
     */
    in_revocation_set?: boolean;
    /**
     * Indicates if the certificate is a root, intermediate, or leaf.
     */
    type?: RootStore.type;
};

export namespace RootStore {
    /**
     * Indicates if the certificate is a root, intermediate, or leaf.
     */
    export enum type {
        UNKNOWN = "UNKNOWN",
        ROOT = "ROOT",
        INTERMEDIATE = "INTERMEDIATE",
        LEAF = "LEAF",
    }
}
