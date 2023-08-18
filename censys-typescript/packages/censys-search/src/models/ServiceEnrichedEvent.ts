/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServiceID } from "./ServiceID";

export type ServiceEnrichedEvent = {
    _event: "service_enriched";
    service_enriched?: {
        id?: ServiceID;
        enrichment?: string;
    };
};
