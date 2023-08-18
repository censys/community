/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from "./Location";
import type { PerspectiveID } from "./PerspectiveID";
import type { Routing } from "./Routing";

export type Host = {
    ip?: string;
    services?: Array<{
        port?: number;
        service_name?: string;
        extended_service_name?: string;
        transport_protocol?: string;
        software?: Array<string>;
        truncated?: boolean;
        perspective_id?: PerspectiveID;
    }>;
    location_updated_at?: string;
    location?: Location;
    autonomous_system_updated_at?: string;
    autonomous_system?: Routing;
    operating_system?: {
        product?: string;
        vendor?: string;
        version?: string;
        edition?: string;
        uniform_resource_identifier?: string;
        other?: any;
    };
};
