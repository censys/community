/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PerspectiveID } from "./PerspectiveID";

export type ServiceRemovedFromHostNotObserved = {
    _reason: ServiceRemovedFromHostNotObserved._reason;
    not_observed?: {
        not_observed_at?: string;
        perspective_id?: PerspectiveID;
    };
};

export namespace ServiceRemovedFromHostNotObserved {
    export enum _reason {
        NOT_OBSERVED = "not_observed",
    }
}
