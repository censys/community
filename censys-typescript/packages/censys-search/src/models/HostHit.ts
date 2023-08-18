/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from "./Location";
import type { Routing } from "./Routing";

export type HostHit = {
    ip?: string;
    services?: Array<{
        port?: number;
        service_name?: string;
        transport_protocol?: string;
        certificate?: string;
    }>;
    location?: Location;
    autonomous_system?: Routing;
};
