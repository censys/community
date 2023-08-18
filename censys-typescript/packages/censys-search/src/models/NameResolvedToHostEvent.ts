/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type NameResolvedToHostEvent = {
    _event: "name_resolved_to_host";
    name_resolved_to_host?: {
        name?: string;
        record_type?: NameResolvedToHostEvent.record_type;
        resolved_at?: string;
    };
};

export namespace NameResolvedToHostEvent {
    export enum record_type {
        UNKNOWN = "unknown",
        A = "a",
        AAAA = "aaaa",
        CNAME = "cname",
    }
}
