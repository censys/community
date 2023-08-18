/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PerspectiveID } from "./PerspectiveID";
import type { ServiceID } from "./ServiceID";

export type ServiceObservedEvent = {
    _event: "service_observed";
    service_observed?: {
        id?: ServiceID;
        observed_at?: string;
        perspective_id?: PerspectiveID;
        /**
         * A list of fields that changed during this observation.
         */
        changed_fields?: Array<{
            field_name?: string;
        }>;
    };
};
