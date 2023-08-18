/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PerspectiveID } from "./PerspectiveID";
import type { ServiceID } from "./ServiceID";

export type ServiceAddedToHostEvent = {
    _event: "service_added_to_host";
    service_added_to_host?: {
        id?: ServiceID;
        observed_at?: string;
        perspective_id?: PerspectiveID;
    };
};
