/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Expired } from "./Expired";
import type { Resolved } from "./Resolved";

export type ReverseDnsUpdatedEvent = {
    _event: "reverse_dns_update";
    reverse_dns_updated?: {
        names?: Array<string>;
        reason?: Expired | Resolved;
    };
};
