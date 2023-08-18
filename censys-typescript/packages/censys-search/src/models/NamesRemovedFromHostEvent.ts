/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { NameRemovedFromHost } from "./NameRemovedFromHost";

export type NamesRemovedFromHostEvent = {
    _event: "names_removed_from_host";
    names_removed_from_host?: {
        names_removed?: Array<NameRemovedFromHost>;
    };
};
