/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ServiceID } from "./ServiceID";
import type { ServiceRemovedFromHostExpired } from "./ServiceRemovedFromHostExpired";
import type { ServiceRemovedFromHostNotObserved } from "./ServiceRemovedFromHostNotObserved";

export type ServiceRemovedFromHostEvent = {
    _event: "service_removed_from_host";
    service_removed_from_host?:
        | ServiceRemovedFromHostNotObserved
        | ServiceRemovedFromHostExpired
        | {
              /**
               * Discriminator which provides the type of reason this object represents.
               */
              _reason?: string;
              id?: ServiceID;
          };
};
