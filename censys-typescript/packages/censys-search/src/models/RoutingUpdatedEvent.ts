/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Routing } from "./Routing";

export type RoutingUpdatedEvent = {
    _event: "routing_updated";
    routing_updated?: {
        routing?: Routing;
    };
};
