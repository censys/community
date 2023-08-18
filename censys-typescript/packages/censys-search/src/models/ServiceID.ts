/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Object used to uniquely identify a service based on its 3-tuple of (port, transport_protocol, service_name) for example `80-TCP-HTTP`.
 */
export type ServiceID = {
    /**
     * Service port number.
     */
    port?: number;
    /**
     * Service transport protocol.
     */
    transport_protocol?: ServiceID.transport_protocol;
    /**
     * Service name.
     */
    service_name?: string;
};

export namespace ServiceID {
    /**
     * Service transport protocol.
     */
    export enum transport_protocol {
        TCP = "TCP",
        UDP = "UDP",
        QUIC = "QUIC",
    }
}
