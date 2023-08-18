/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Location } from "./Location";

export type LocationUpdatedEvent = {
    _event: "location_updated";
    location_updated?: {
        location?: Location;
    };
};
