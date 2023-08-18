/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ServiceRemovedFromHostExpired = {
    _reason: ServiceRemovedFromHostExpired._reason;
    expired?: {
        expired_at?: string;
    };
};

export namespace ServiceRemovedFromHostExpired {
    export enum _reason {
        EXPIRED = "expired",
    }
}
