/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class SeedsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * If you are writing an integration to automatically update your seed data
     * consider using this endpoint. This endpoint will remove all seeds with a
     * certain label and add new seeds in a single step. If, for instance, you
     * wanted to automatically keep your seed list up to date with all public IPs
     * from your AWS account you may do something like the following:
     *
     * <br/>
     *
     * ```js
     * // Runs on a schedule every 24 hours
     * allPublicIps = getPublicIpsFromAws()
     *
     * publicIpSeeds = []
     *
     * for (publicIp in allPublicIps) {
     * publicIpSeeds.push({
     * type: 'IP_ADDRESS',
     * value: publicIp
     * })
     * }
     *
     * response = replaceSeeds({
     * label: 'AWS',
     * seeds: publicIpSeeds,
     * })
     * ```
     *
     * <br/>
     *
     * The above script would replace your entire list of public IPs on AWS
     * with the latest most up to date information every 24 hours. The Censys
     * association algorithm will then always have the best data possible so
     * we can provide you the most accurate look of your publicly exposed
     * assets. Note that all domain names must be lowercase.
     * @param label Set the label whose seeds should be replaced with those specified in the request body.
     * @param requestBody
     * @param force If a warning that would prevent the replace operation appears, use this flag to ignore them
     * and proceed. This operation cannot be reversed, so backing up your seeds before this is
     * recommended when using this flag.
     * @returns any
     * @throws ApiError
     */
    public putV1Seeds(
        label: string,
        requestBody: {
            seeds: Array<{
                type: "ASN" | "CIDR" | "DOMAIN_NAME" | "IP_ADDRESS";
                value: string | number;
            }>;
        },
        force?: boolean
    ): CancelablePromise<{
        removedSeeds: Array<{
            id: number;
            value: string | number;
            type:
                | "ASN"
                | "CENSYS_HOST"
                | "CERT_SHA_256"
                | "CIDR"
                | "CUSTOM"
                | "DOMAIN_NAME"
                | "IP_ADDRESS"
                | "WHOIS_ASN"
                | "WHOIS_ENTITY"
                | "WHOIS_NET";
            label: string | null;
            source: "API" | "CLOUD_CONNECTOR" | "UI";
        }>;
        skippedReservedSeeds: Array<string | number>;
        addedSeeds: Array<
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "ASN";
                  value: number;
                  label: string | null;
              }
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "IP_ADDRESS";
                  value: string;
                  label: string | null;
              }
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "DOMAIN_NAME";
                  value: string;
                  label: string | null;
              }
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "CIDR";
                  value: string;
                  label: string | null;
              }
        >;
    }> {
        return this.httpRequest.request({
            method: "PUT",
            url: "/v1/seeds",
            query: {
                label: label,
                force: force,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Add seed data using this endpoint. We discover public facing assets on the
     * internet associated to you using this seed data as a starting point. If
     * you are writing an integration to automatically update your seed data consider
     * using the `PUT /api/v1/seeds` endpoint instead. Note that all domain names
     * must be lowercase.
     * @param requestBody
     * @param force
     * @returns any
     * @throws ApiError
     */
    public postV1Seeds(
        requestBody: {
            seeds: Array<
                | {
                      label: string | null;
                      type: "ASN";
                      value: number;
                  }
                | {
                      label: string | null;
                      type: "IP_ADDRESS";
                      value: string;
                  }
                | {
                      label: string | null;
                      type: "DOMAIN_NAME";
                      value: string;
                  }
                | {
                      label: string | null;
                      type: "CIDR";
                      value: string;
                  }
            >;
        },
        force?: boolean
    ): CancelablePromise<{
        addedSeeds: Array<
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "ASN";
                  value: number;
                  label: string | null;
              }
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "IP_ADDRESS";
                  value: string;
                  label: string | null;
              }
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "DOMAIN_NAME";
                  value: string;
                  label: string | null;
              }
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "CIDR";
                  value: string;
                  label: string | null;
              }
        >;
        skippedReservedSeeds: Array<string | number>;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/v1/seeds",
            query: {
                force: force,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Removes seeds with a specified label from the system.
     * @param label
     * @returns any
     * @throws ApiError
     */
    public deleteV1Seeds(label: string): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/seeds",
            query: {
                label: label,
            },
        });
    }

    /**
     * Returns a full list of all seed data you've added to the system whether via
     * the API or the user interface.
     * @param label
     * @param type
     * @returns any
     * @throws ApiError
     */
    public getV1Seeds(
        label?: string,
        type?: string
    ): CancelablePromise<{
        seeds: Array<
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "ASN";
                  value: number;
                  label: string | null;
              }
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "IP_ADDRESS";
                  value: string;
                  label: string | null;
              }
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "DOMAIN_NAME";
                  value: string;
                  label: string | null;
              }
            | {
                  source: "API" | "CLOUD_CONNECTOR" | "UI";
                  createdOn?: string | null;
                  isAutomatedDiscovery?: boolean | null;
                  id?: number;
                  type: "CIDR";
                  value: string;
                  label: string | null;
              }
        >;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/seeds",
            query: {
                label: label,
                type: type,
            },
        });
    }

    /**
     * Removes specified seeds from the system.
     * @param id
     * @returns any
     * @throws ApiError
     */
    public deleteV1Seeds1(id: number): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/seeds/{id}",
            path: {
                id: id,
            },
        });
    }

    /**
     * Retrieve a specified seed from the system.
     * @param id
     * @returns any
     * @throws ApiError
     */
    public getV1Seeds1(id: number): CancelablePromise<
        | {
              source: "API" | "CLOUD_CONNECTOR" | "UI";
              createdOn?: string | null;
              isAutomatedDiscovery?: boolean | null;
              id?: number;
              type: "ASN";
              value: number;
              label: string | null;
          }
        | {
              source: "API" | "CLOUD_CONNECTOR" | "UI";
              createdOn?: string | null;
              isAutomatedDiscovery?: boolean | null;
              id?: number;
              type: "IP_ADDRESS";
              value: string;
              label: string | null;
          }
        | {
              source: "API" | "CLOUD_CONNECTOR" | "UI";
              createdOn?: string | null;
              isAutomatedDiscovery?: boolean | null;
              id?: number;
              type: "DOMAIN_NAME";
              value: string;
              label: string | null;
          }
        | {
              source: "API" | "CLOUD_CONNECTOR" | "UI";
              createdOn?: string | null;
              isAutomatedDiscovery?: boolean | null;
              id?: number;
              type: "CIDR";
              value: string;
              label: string | null;
          }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/seeds/{id}",
            path: {
                id: id,
            },
        });
    }
}
