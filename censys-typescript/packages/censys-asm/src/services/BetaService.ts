/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class BetaService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get logbook entries by querying this endpoint. Since the amount
     * of logbook data may be significant multiple calls to this endpoint
     * could be required to collect all the data matching the filters you
     * provide.
     *
     * <br/>
     *
     * The first call to this endpoint should pass in any filters.
     * This initial call will return an array of results and an opaque cursor
     * called `nextWindowCursor` which will either be a string or null. If this
     * value is null no additional results are available. If the value is a string
     * you can use this in your next call to this endpoint to get the next
     * segment of data. Subsequent calls to this endpoint only accept the
     * string `nextWindowCursor` variable and do not require filters to be
     * provided.
     *
     * <br/>
     *
     * Note: there may be a nextWindowCursor even if the results array
     * is empty for a given call and the presence of nextWindowCursor does
     * not guarantee that any subsequent call will contain any results.
     *
     * <br/>
     *
     * Here's some pseudo code demonstrating how this might be accomplished.
     *
     * <br/>
     *
     * ```js
     * response = getLogbookData({
     * filters: yourFiltersObject
     * })
     * results = response.results
     * while (response.nextWindowCursor != null) {
     * response = getLogbookData({
     * nextWindowCursor: response.nextWindowCursor
     * })
     * results.addAll(response.results)
     * }
     * ```
     *
     * <br/>
     *
     * All results for the given filters should now be in the results variable.
     *
     * <br/>
     *
     * _Tip: When querying for only new data it would probably be a good idea to
     * store the id of the first result retrieved and use that as the idRange.end
     * filter the next time you initiate a call to this function._
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postBetaLogbookGetLogbookData(requestBody?: {
        filters?: {
            general?: {
                includedIpCidr?: Array<string>;
                excludedIpCidr?: Array<string>;
                domains?: {
                    inverted?: boolean;
                    items: Array<string>;
                };
                includedSslHash?: Array<string>;
                excludedSslHash?: Array<string>;
                types?: Array<
                    | "CERT"
                    | "CERT_RISK"
                    | "DOMAIN"
                    | "DOMAIN_EXPIRATION_DATE"
                    | "DOMAIN_MAIL_EXCHANGE_SERVER"
                    | "DOMAIN_NAME_SERVER"
                    | "DOMAIN_REGISTRAR"
                    | "DOMAIN_RISK"
                    | "DOMAIN_SUBDOMAIN"
                    | "HOST"
                    | "HOST_CDN"
                    | "HOST_CERT"
                    | "HOST_PORT"
                    | "HOST_PROTOCOL"
                    | "HOST_RISK"
                    | "HOST_SOFTWARE"
                    | "HOST_VULNERABILITY"
                    | "OBJECT_STORAGE"
                    | "RISK_USER_CONFIG"
                >;
                tags?: {
                    inverted?: boolean;
                    items: Array<string>;
                    comparison: "IN" | "OVERLAPS";
                };
            };
            host?: {
                includedEventTypes?: Array<"ASSOCIATE" | "DISASSOCIATE">;
            };
            hostPort?: {
                includedEventTypes?: Array<"ADD" | "REMOVE">;
                ports?: {
                    inverted?: boolean;
                    value: Array<number>;
                };
            };
            hostSoftware?: {
                includedEventTypes?: Array<"ADD" | "REMOVE">;
                software?: {
                    vendorProduct: string;
                    version: string | null;
                };
            };
            hostProtocol?: {
                includedEventTypes?: Array<"ADD" | "REMOVE">;
                app?: {
                    inverted?: boolean;
                    items: Array<string>;
                };
            };
            hostCve?: {
                includedEventTypes?: Array<"ADD" | "CHANGE" | "REMOVE">;
                cve?: {
                    inverted?: boolean;
                    items: Array<string>;
                };
                cvss?: {
                    /**
                     * Operator "lte" corresponds to "less than or equal to"
                     * Operator "gte" corresponds to "greater than or equal to"
                     */
                    operator: "gte" | "lte";
                    value: number;
                };
            };
            hostCert?: {
                includedEventTypes?: Array<"ADD" | "REMOVE">;
            };
            cert?: {
                includedEventTypes?: Array<"ASSOCIATE" | "DISASSOCIATE">;
            };
            domain?: {
                includedEventTypes?: Array<"ASSOCIATE" | "DISASSOCIATE">;
            };
            expires?: {
                includedEventTypes?: Array<"ADD" | "CHANGE" | "REMOVE">;
                dateRange?: {
                    start?: string;
                    end?: string;
                };
            };
            nameserver?: {
                includedEventTypes?: Array<"ADD" | "REMOVE">;
                nameservers?: {
                    inverted?: boolean;
                    items: Array<string>;
                };
            };
            registrar?: {
                includedEventTypes?: Array<"ADD" | "CHANGE" | "REMOVE">;
                registrars?: {
                    inverted?: boolean;
                    items: Array<string>;
                };
            };
            mxServer?: {
                includedEventTypes?: Array<"ADD" | "REMOVE">;
                mxServers?: {
                    inverted?: boolean;
                    items: Array<string>;
                };
            };
            dns?: {
                includedEventTypes?: Array<"ADD" | "REMOVE">;
                subdomains?: {
                    inverted?: boolean;
                    items: Array<string>;
                };
            };
            dateRange?: {
                start?: string;
                end?: string;
                excludeStart?: boolean;
                includeEnd?: boolean;
            };
            idRange?: {
                start?: number;
                end?: number;
                excludeStart?: boolean;
                includeEnd?: boolean;
            };
        };
        nextWindowCursor?: string;
    }): CancelablePromise<{
        nextWindowCursor: string | null;
        results: Array<
            | {
                  type: "HOST";
                  logSubType: "ASSOCIATE" | "DISASSOCIATE";
                  /**
                   * Asset IP address
                   */
                  ip: string;
                  id: number;
                  timestamp: string;
                  logData: any;
              }
            | {
                  type: "HOST_PORT";
                  logSubType: "ADD" | "REMOVE";
                  logData: {
                      /**
                       * TCP/IP port number on the asset
                       */
                      port: number;
                  };
                  /**
                   * Asset IP address
                   */
                  ip: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  type: "HOST_SOFTWARE";
                  logSubType: "ADD" | "REMOVE";
                  logData: {
                      /**
                       * Vendor for the software
                       */
                      vendorProduct: string;
                      /**
                       * Software version string
                       */
                      version: string | null;
                  };
                  /**
                   * Asset IP address
                   */
                  ip: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  type: "HOST_PROTOCOL";
                  logSubType: "ADD" | "REMOVE";
                  logData: {
                      /**
                       * Application layer protocol
                       */
                      protocol: string;
                  };
                  /**
                   * Asset IP address
                   */
                  ip: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  type: "HOST_VULNERABILITY";
                  logSubType: "ADD" | "CHANGE" | "REMOVE";
                  logData: {
                      /**
                       * CVE-ID, see https://cve.mitre.org
                       */
                      cve: string;
                      /**
                       * CVSS 2 score for vulnerability, see https://nvd.nist.gov/vuln-metrics/cvss/v2-calculator
                       */
                      cvss: number;
                  };
                  /**
                   * Asset IP address
                   */
                  ip: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  type: "HOST_CERT";
                  logSubType: "ADD" | "REMOVE";
                  logData: {
                      app?: string;
                      port: number;
                  };
                  ip: string;
                  sslHash: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  type: "CERT";
                  logSubType: "ASSOCIATE" | "DISASSOCIATE";
                  /**
                   * SHA256 hash identifier for the asset certificate
                   */
                  sslHash: string;
                  id: number;
                  timestamp: string;
                  logData: any;
              }
            | {
                  type: "DOMAIN";
                  logSubType: "ASSOCIATE" | "DISASSOCIATE";
                  /**
                   * This name refers to this event's domain name.
                   */
                  name: string;
                  id: number;
                  timestamp: string;
                  logData: any;
              }
            | {
                  type: "DOMAIN_EXPIRATION_DATE";
                  logSubType: "ADD" | "CHANGE" | "REMOVE";
                  logData: {
                      /**
                       * Domain expiration date, from whois data
                       */
                      expires: string;
                  };
                  /**
                   * This name refers to this event's domain name.
                   */
                  name: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  type: "DOMAIN_NAME_SERVER";
                  logSubType: "ADD" | "REMOVE";
                  logData: {
                      /**
                       * NS entry for domains
                       */
                      nameserver: string;
                  };
                  /**
                   * This name refers to this event's domain name.
                   */
                  name: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  type: "DOMAIN_REGISTRAR";
                  logSubType: "ADD" | "CHANGE" | "REMOVE";
                  logData: {
                      /**
                       * Registrar for domain, from whois
                       */
                      registrar: string;
                  };
                  /**
                   * This name refers to this event's domain name.
                   */
                  name: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  type: "DOMAIN_MAIL_EXCHANGE_SERVER";
                  logSubType: "ADD" | "REMOVE";
                  logData: {
                      /**
                       * Mail exchange server, from DNS records
                       */
                      mxServer: string;
                  };
                  /**
                   * This name refers to this event's domain name.
                   */
                  name: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  type: "DOMAIN_SUBDOMAIN";
                  logSubType: "ADD" | "REMOVE";
                  logData: {
                      /**
                       * Hostname (or DNS name) of the entity
                       */
                      dns: string;
                  };
                  /**
                   * This name refers to this event's domain name.
                   */
                  name: string;
                  id: number;
                  timestamp: string;
              }
            | {
                  assetId: string;
                  logSubType: "ASSOCIATE" | "DISASSOCIATE";
                  id: number;
                  type:
                      | "CERT"
                      | "CERT_RISK"
                      | "DOMAIN"
                      | "DOMAIN_EXPIRATION_DATE"
                      | "DOMAIN_MAIL_EXCHANGE_SERVER"
                      | "DOMAIN_NAME_SERVER"
                      | "DOMAIN_REGISTRAR"
                      | "DOMAIN_RISK"
                      | "DOMAIN_SUBDOMAIN"
                      | "HOST"
                      | "HOST_CDN"
                      | "HOST_CERT"
                      | "HOST_PORT"
                      | "HOST_PROTOCOL"
                      | "HOST_RISK"
                      | "HOST_SOFTWARE"
                      | "HOST_VULNERABILITY"
                      | "OBJECT_STORAGE"
                      | "RISK_USER_CONFIG";
                  timestamp: string;
                  logData: any;
              }
        >;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/beta/logbook/getLogbookData",
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * This endpoint can be used to add cloud assets, such as object stores. It
     * will replace any assets that were previously added using the same cloud
     * connector UID.
     * This endpoint is intended to only be used by cloud connectors.
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postBetaCloudConnectorAddCloudAssets(requestBody: {
        cloudConnectorUid: string;
        cloudAssets: Array<{
            type: "OBJECT_STORAGE";
            value: string;
            cspLabel: "AWS" | "AZURE" | "GCP";
            scanData: string;
        }>;
    }): CancelablePromise<{
        addedAssets: Array<string>;
        removedAssets: Array<string>;
        updatedAssets: Array<string>;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/beta/cloudConnector/addCloudAssets",
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Keywords are used to generate permutations of possible bucket names.
     * This endpoint is used to add new keywords. Keywords must follow name requirements prescribed by AWS, GCP, or Azure
     * for storage buckets in regards to special characters and character length.
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postBetaConfigObjectStorageKeywords(requestBody: {
        keywords: Array<string>;
    }): CancelablePromise<{
        added: Array<{
            keyword: string;
            createdAt: string;
            createdBy: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/beta/config/object-storage/keywords",
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Remove storage bucket keywords. The response contains the keywords that were successfully removed.
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public deleteBetaConfigObjectStorageKeywords(requestBody: {
        keywords: Array<string>;
    }): CancelablePromise<{
        removed: Array<{
            keyword: string;
            createdAt: string;
            createdBy: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/beta/config/object-storage/keywords",
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get all storage bucket keywords.
     * @returns any
     * @throws ApiError
     */
    public getBetaConfigObjectStorageKeywords(): CancelablePromise<
        Array<{
            keyword: string;
            createdAt: string;
            createdBy: string;
        }>
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/config/object-storage/keywords",
        });
    }

    /**
     * Returns all seeds and cloud assets within the system.
     * @param pageNumber
     * @param pageSize
     * @returns any
     * @throws ApiError
     */
    public getBetaAssetsInputAssets(
        pageNumber?: number,
        pageSize?: number
    ): CancelablePromise<{
        pageNumber: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
        assets: Array<{
            type:
                | "ASN"
                | "CENSYS_HOST"
                | "CERT_SHA_256"
                | "CIDR"
                | "CUSTOM"
                | "DOMAIN_NAME"
                | "IP_ADDRESS"
                | "OBJECT_STORAGE"
                | "WHOIS_ASN"
                | "WHOIS_ENTITY"
                | "WHOIS_NET";
            value: string;
            source: "API" | "CLOUD_CONNECTOR" | "UI";
            label: string;
        }>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/assets/inputAssets",
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            },
        });
    }

    /**
     * Returns a full list of all object storage assets within the system.
     * @param pageNumber
     * @param pageSize
     * @param tag
     * @param tagOperator
     * @param discoveryTrail
     * @returns any
     * @throws ApiError
     */
    public getBetaAssetsObjectStorages(
        pageNumber?: number,
        pageSize?: number,
        tag?: Array<string>,
        tagOperator?: "contains" | "is" | "is not" | "not contains",
        discoveryTrail?: boolean
    ): CancelablePromise<{
        pageNumber: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
        assets: Array<{
            risks: Array<{
                name: string;
                categories: Array<string>;
                title: string;
                severity: string;
                type: "STORAGE_BUCKET_RISK";
            }>;
            data: {
                accountId: string;
            };
            comments: {
                totalComments: number;
                refUrl: string;
            };
            type: "CERT" | "DOMAIN" | "HOST" | "STORAGE_BUCKET" | "SUBDOMAIN";
            assetId: string;
            isSeed: boolean;
            tags: Array<{
                name: string;
                color: string;
            }>;
            /**
             * Enables basic storage and retrieval of dates and times.
             */
            associatedAt: string;
            discoveryTrail?: Array<{
                type:
                    | "ASN"
                    | "CENSYS_HOST"
                    | "CENSYS_SCAN"
                    | "CERT_SHA_256"
                    | "CIDR"
                    | "CUSTOM"
                    | "DOMAIN_NAME"
                    | "IP_ADDRESS"
                    | "OBJECT_STORAGE"
                    | "WHOIS_ASN"
                    | "WHOIS_ENTITY"
                    | "WHOIS_NET";
                assetId: string;
                isSeed: boolean;
                refUrl: string | null;
            }>;
        }>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/assets/object-storages",
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                tag: tag,
                tagOperator: tagOperator,
                discoveryTrail: discoveryTrail,
            },
        });
    }

    /**
     * Returns a list of all object storage assets with the given name.
     * @param objectStorageName
     * @param includeRiskDetails
     * @returns any
     * @throws ApiError
     */
    public getBetaAssetsObjectStorages1(
        objectStorageName: string,
        includeRiskDetails?: boolean
    ): CancelablePromise<{
        access: {
            editableSettings: boolean | null;
            readableObjects: boolean | null;
            writableObjects: boolean | null;
        };
        associatedAt: string;
        assetId: string;
        comments: {
            totalComments: number;
            refUrl: string;
        };
        data: {
            accountId: string;
        };
        discoveryTrail: Array<{
            type:
                | "ASN"
                | "CENSYS_HOST"
                | "CENSYS_SCAN"
                | "CERT_SHA_256"
                | "CIDR"
                | "CUSTOM"
                | "DOMAIN_NAME"
                | "IP_ADDRESS"
                | "OBJECT_STORAGE"
                | "WHOIS_ASN"
                | "WHOIS_ENTITY"
                | "WHOIS_NET";
            assetId: string;
            isSeed: boolean;
            refUrl: string | null;
        }>;
        isSeed: boolean;
        lastScannedAt: string;
        nameStems: {
            domains?: Array<{
                domain: string;
                exists: boolean;
            }>;
            subdomains?: Array<{
                subdomain: string;
                domain: string | null;
            }>;
        };
        risks: Array<{
            categories: Array<string>;
            description: string;
            name: string;
            remediations: Array<string>;
            riskId: number;
            riskInfoId: number;
            severity: "accepted" | "critical" | "high" | "low" | "medium";
            title: string;
            url: string;
            firstSeen?: string;
            lastSeen?: string;
            changeReason?: string;
            remediated?: boolean;
            base: {
                type: string;
                description: string;
                remediations: Array<string>;
                enabled: boolean;
                config: any;
                name: string;
                defaultSeverity:
                    | "accepted"
                    | "critical"
                    | "high"
                    | "low"
                    | "medium";
                defaultCategories: Array<string>;
                lastSeverityChangeReason: string;
                lastDisableReason: string;
            };
            displayName: string;
            lastSeverityChangeReason: string;
            lastMuteReason: string;
            firstComputedAt: string;
            lastComputedAt: string;
            lastUpdatedAt: string;
            status: "accepted" | "closed" | "open";
            userStatus?: "muted";
        }>;
        source: "CENSYS_SCAN" | "CLOUD_CONNECTOR";
        tags: Array<{
            color: string | null;
            label: string;
            tagId: number;
        }>;
        type: "STORAGE_BUCKET";
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/assets/object-storages/{objectStorageName}",
            path: {
                objectStorageName: objectStorageName,
            },
            query: {
                includeRiskDetails: includeRiskDetails,
            },
        });
    }

    /**
     * Tag an object storage asset.
     * @param objectStorageName
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postBetaAssetsObjectStoragesTags(
        objectStorageName: string,
        requestBody: {
            name: string;
            color?: string;
        }
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "POST",
            url: "/beta/assets/object-storages/{objectStorageName}/tags",
            path: {
                objectStorageName: objectStorageName,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Remove a tag from an object storage asset.
     * @param objectStorageName
     * @param name
     * @returns any
     * @throws ApiError
     */
    public deleteBetaAssetsObjectStoragesTags(
        objectStorageName: string,
        name: string
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/beta/assets/object-storages/{objectStorageName}/tags/{name}",
            path: {
                objectStorageName: objectStorageName,
                name: name,
            },
        });
    }

    /**
     * Add a comment to an object storage asset.
     * @param objectStorageName
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postBetaAssetsObjectStoragesComments(
        objectStorageName: string,
        requestBody: {
            markdown: string;
        }
    ): CancelablePromise<{
        commentId: number;
        markdown: string;
        createdOn: string;
        createdBy: string | null;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/beta/assets/object-storages/{objectStorageName}/comments",
            path: {
                objectStorageName: objectStorageName,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Retrieve all comments on an object storage asset.
     * @param objectStorageName
     * @param pageNumber
     * @param pageSize
     * @returns any
     * @throws ApiError
     */
    public getBetaAssetsObjectStoragesComments(
        objectStorageName: string,
        pageNumber?: number,
        pageSize?: number
    ): CancelablePromise<{
        comments: Array<{
            type: "OBJECT_STORAGE";
            objectStorageName: string;
            commentId: number;
            createdOn: string;
            createdBy: string | null;
            markdown: string;
        }>;
        totalItems: number;
        pageSize: number;
        pageNumber: number;
        totalPages: number;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/assets/object-storages/{objectStorageName}/comments",
            path: {
                objectStorageName: objectStorageName,
            },
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            },
        });
    }

    /**
     * Remove a specific comment from an object storage asset.
     * @param objectStorageName
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public deleteBetaAssetsObjectStoragesComments(
        objectStorageName: string,
        commentId: number
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/beta/assets/object-storages/{objectStorageName}/comments/{commentId}",
            path: {
                objectStorageName: objectStorageName,
                commentId: commentId,
            },
        });
    }

    /**
     * Retrieve the specified comment from the system.
     * @param objectStorageName
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public getBetaAssetsObjectStoragesComments1(
        objectStorageName: string,
        commentId: number
    ): CancelablePromise<{
        type: "OBJECT_STORAGE";
        objectStorageName: string;
        commentId: number;
        createdOn: string;
        createdBy: string | null;
        markdown: string;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/assets/object-storages/{objectStorageName}/comments/{commentId}",
            path: {
                objectStorageName: objectStorageName,
                commentId: commentId,
            },
        });
    }

    /**
     * Get all of the configurable risks
     * @param pageNumber
     * @param pageSize
     * @returns any
     * @throws ApiError
     */
    public getBetaRisks(
        pageNumber?: number,
        pageSize?: number
    ): CancelablePromise<{
        data: Array<{
            riskInfoId: number;
            type: string;
            name: string;
            description: string;
            defaultSeverity:
                | "accepted"
                | "critical"
                | "high"
                | "low"
                | "medium";
            currentSeverity:
                | "accepted"
                | "critical"
                | "high"
                | "low"
                | "medium";
            remediations: Array<string>;
            enabled: boolean;
            categoryNames: Array<string>;
            config: any;
        }>;
        totalRisks: number;
        pageSize: number;
        pageNumber: number;
        totalPages: number;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/risks",
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            },
        });
    }

    /**
     * Update a risks enabled value
     * @param riskInfoId
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public patchBetaRisks(
        riskInfoId: number,
        requestBody?: {
            enabled?: boolean;
            severity?: "accepted" | "critical" | "high" | "low" | "medium";
            changeReason?: string;
            config?: any;
        }
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "PATCH",
            url: "/beta/risks/{riskInfoId}",
            path: {
                riskInfoId: riskInfoId,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Get a risk by id
     * @param riskInfoId
     * @returns any
     * @throws ApiError
     */
    public getBetaRisks1(riskInfoId: number): CancelablePromise<{
        data: {
            riskInfoId: number;
            type: string;
            name: string;
            description: string;
            defaultSeverity:
                | "accepted"
                | "critical"
                | "high"
                | "low"
                | "medium";
            currentSeverity:
                | "accepted"
                | "critical"
                | "high"
                | "low"
                | "medium";
            remediations: Array<string>;
            enabled: boolean;
            categoryNames: Array<string>;
            config: any;
        };
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/risks/{riskInfoId}",
            path: {
                riskInfoId: riskInfoId,
            },
        });
    }

    /**
     * Retrieve asset counts by environment. Assets found after the date provided
     * in the `since` parameter will be included in the new asset counts.
     * This parameter should be in ISO 8601 format, for example YYYY-MM-DD.
     * @param assetType
     * @param since
     * @param environment
     * @returns any
     * @throws ApiError
     */
    public getBetaAssetsCounts(
        assetType:
            | "CERT"
            | "DOMAIN"
            | "HOST"
            | "SOFTWARE"
            | "STORAGE_BUCKET"
            | "SUBDOMAIN",
        since?: string,
        environment?: "ALL" | "CLOUD" | "OTHER" | "SHARED"
    ): CancelablePromise<{
        environment: "ALL" | "CLOUD" | "OTHER" | "SHARED";
        newAssetsSince: string;
        requestCompleteTime: string;
        totalCount: number;
        totalNewCount: number;
        totalCountsBySubEnvironment: Array<{
            environment: string;
            totalCount: number;
            totalNewCount: number;
        }>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/assets/counts",
            query: {
                since: since,
                environment: environment,
                assetType: assetType,
            },
        });
    }

    /**
     * Retrieve count of hosts in each country by environment. Assets found
     * after the date provided in the `since` parameter will be included in
     * the new asset counts. This parameter should be in ISO 8601 format, for
     * example YYYY-MM-DD.
     * @param since
     * @param environment
     * @returns any
     * @throws ApiError
     */
    public getBetaAssetsHostCountsByCountry(
        since?: string,
        environment?: "ALL" | "CLOUD" | "OTHER" | "SHARED"
    ): CancelablePromise<{
        environment: "ALL" | "CLOUD" | "OTHER" | "SHARED";
        newAssetsSince: string;
        requestCompleteTime: string;
        totalCount: number;
        totalNewCount: number;
        totalCountsBySubEnvironment: Array<{
            environment: string;
            totalCountsByCountry: Array<{
                country: string;
                countryCode: string;
                totalCount: number;
                totalNewCount: number;
            }>;
        }>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/assets/hostCountsByCountry",
            query: {
                since: since,
                environment: environment,
            },
        });
    }

    /**
     * Get all user workspaces.
     * @param userUuid
     * @returns any
     * @throws ApiError
     */
    public getBetaUsersWorkspaces(userUuid: string): CancelablePromise<
        Array<{
            workspace: string;
            roles: Array<string>;
        }>
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/beta/users/{userUuid}/workspaces",
            path: {
                userUuid: userUuid,
            },
        });
    }
}
