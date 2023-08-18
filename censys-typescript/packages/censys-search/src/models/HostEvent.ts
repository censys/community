/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LocationUpdatedEvent } from "./LocationUpdatedEvent";
import type { NameResolvedToHostEvent } from "./NameResolvedToHostEvent";
import type { NamesRemovedFromHostEvent } from "./NamesRemovedFromHostEvent";
import type { ReverseDnsUpdatedEvent } from "./ReverseDnsUpdatedEvent";
import type { RoutingUpdatedEvent } from "./RoutingUpdatedEvent";
import type { ServiceAddedToHostEvent } from "./ServiceAddedToHostEvent";
import type { ServiceEnrichedEvent } from "./ServiceEnrichedEvent";
import type { ServiceObservedEvent } from "./ServiceObservedEvent";
import type { ServiceRemovedFromHostEvent } from "./ServiceRemovedFromHostEvent";

export type HostEvent =
    | ServiceObservedEvent
    | LocationUpdatedEvent
    | RoutingUpdatedEvent
    | ServiceRemovedFromHostEvent
    | ServiceAddedToHostEvent
    | ServiceEnrichedEvent
    | NameResolvedToHostEvent
    | NamesRemovedFromHostEvent
    | ReverseDnsUpdatedEvent
    | {
          /**
           * Discriminator which provides the type of event this object represents.
           */
          _event?: string;
          timestamp?: string;
      };
