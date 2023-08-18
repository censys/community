/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class AssetsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns a full list of all hosts within the system. The `tag` and
     * `tagOperator` params can be used to filter by tag. The `source` param
     * can be used to filter by source. Supported values for `source` are:
     * - "Seed"
     * - "Censys Scan"
     * - "AWS Connector"
     * - "GCP Connector"
     * - "AZURE Connector"
     * @param pageNumber
     * @param pageSize
     * @param tag
     * @param tagOperator
     * @param source
     * @param discoveryTrail
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsHosts(
        pageNumber?: number,
        pageSize?: number,
        tag?: Array<string>,
        tagOperator?: "contains" | "is" | "is not" | "not contains",
        source?: Array<string>,
        discoveryTrail?: boolean
    ): CancelablePromise<{
        pageNumber: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
        assets: Array<{
            associatedAt: string | null;
            source: string | null;
            risks: Array<{
                type: "HOST_RISK";
                port: number;
                transportProtocol: string;
                name: string;
                categories: Array<string>;
                title: string;
                severity: string;
            }>;
            data: {
                ipAddress: string;
                names: {
                    forwardDns: Array<{
                        name: string;
                        resolvedAt: string;
                    }>;
                    reverseDns: Array<{
                        name: string;
                        resolvedAt: string;
                    }>;
                };
                protocols: Array<{
                    transportProtocol: string;
                    port: number;
                    protocol: string;
                    software: Array<{
                        name: string;
                        version: string;
                        uri: string;
                        part: "" | "a" | "h" | "o";
                        vendor: string;
                        product: string;
                        isEol: boolean;
                    }>;
                    base64EncodedBanner: string | null;
                    certificates: Array<{
                        sha256: string;
                        refUrl: string;
                    }>;
                }>;
                asn: number | null;
                cloud: string | null;
                location: {
                    countryCode: string | null;
                    province: string | null;
                    latitude: number | null;
                    longitude: number | null;
                };
                cdn: Array<string>;
                classifications: Array<string>;
            };
            comments: {
                totalComments: number;
                refUrl: string;
            };
            type: "CERT" | "DOMAIN" | "HOST" | "SUBDOMAIN";
            assetId: string;
            isSeed: boolean;
            tags: Array<{
                name: string;
                color: string;
            }>;
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
            url: "/v1/assets/hosts",
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                tag: tag,
                tagOperator: tagOperator,
                source: source,
                discoveryTrail: discoveryTrail,
            },
        });
    }

    /**
     * Retrieve a specified host from the system.
     * @param ipAddress
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsHost(ipAddress: string): CancelablePromise<{
        associatedAt: string | null;
        source: string | null;
        risks: Array<{
            type: "HOST_RISK";
            port: number;
            transportProtocol: string;
            name: string;
            categories: Array<string>;
            title: string;
            severity: string;
        }>;
        data: {
            ipAddress: string;
            names: {
                forwardDns: Array<{
                    name: string;
                    resolvedAt: string;
                }>;
                reverseDns: Array<{
                    name: string;
                    resolvedAt: string;
                }>;
            };
            protocols: Array<{
                transportProtocol: string;
                port: number;
                protocol: string;
                software: Array<{
                    name: string;
                    version: string;
                    uri: string;
                    part: "" | "a" | "h" | "o";
                    vendor: string;
                    product: string;
                    isEol: boolean;
                }>;
                base64EncodedBanner: string | null;
                certificates: Array<{
                    sha256: string;
                    refUrl: string;
                }>;
            }>;
            asn: number | null;
            cloud: string | null;
            location: {
                countryCode: string | null;
                province: string | null;
                latitude: number | null;
                longitude: number | null;
            };
            cdn: Array<string>;
            classifications: Array<string>;
        };
        comments: {
            totalComments: number;
            refUrl: string;
        };
        type: "CERT" | "DOMAIN" | "HOST" | "SUBDOMAIN";
        assetId: string;
        isSeed: boolean;
        tags: Array<{
            name: string;
            color: string;
        }>;
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
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/assets/hosts/{ipAddress}",
            path: {
                ipAddress: ipAddress,
            },
        });
    }

    /**
     * Add a comment.
     * @param ipAddress
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postV1AssetsHostsComments(
        ipAddress: string,
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
            url: "/v1/assets/hosts/{ipAddress}/comments",
            path: {
                ipAddress: ipAddress,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * View all host comments.
     * @param ipAddress
     * @param pageNumber
     * @param pageSize
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsHostsComments(
        ipAddress: string,
        pageNumber?: number,
        pageSize?: number
    ): CancelablePromise<{
        comments: Array<{
            type: "HOST";
            ipAddress: string;
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
            url: "/v1/assets/hosts/{ipAddress}/comments",
            path: {
                ipAddress: ipAddress,
            },
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            },
        });
    }

    /**
     * Remove a specific comment from a host.
     * @param ipAddress
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public deleteV1AssetsHostsComments(
        ipAddress: string,
        commentId: number
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/assets/hosts/{ipAddress}/comments/{commentId}",
            path: {
                ipAddress: ipAddress,
                commentId: commentId,
            },
        });
    }

    /**
     * Retrieve the specified comment from the system.
     * @param ipAddress
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsHostComment(
        ipAddress: string,
        commentId: number
    ): CancelablePromise<{
        type: "HOST";
        ipAddress: string;
        commentId: number;
        createdOn: string;
        createdBy: string | null;
        markdown: string;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/assets/hosts/{ipAddress}/comments/{commentId}",
            path: {
                ipAddress: ipAddress,
                commentId: commentId,
            },
        });
    }

    /**
     * Add tag to a host
     * @param ipAddress
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postV1AssetsHostsTags(
        ipAddress: string,
        requestBody: {
            name: string;
            color?: string;
        }
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "POST",
            url: "/v1/assets/hosts/{ipAddress}/tags",
            path: {
                ipAddress: ipAddress,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Remove a tag from a host
     * @param ipAddress
     * @param name
     * @returns any
     * @throws ApiError
     */
    public deleteV1AssetsHostsTags(
        ipAddress: string,
        name: string
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/assets/hosts/{ipAddress}/tags/{name}",
            path: {
                ipAddress: ipAddress,
                name: name,
            },
        });
    }

    /**
     * Retrieve all certificates from the system.
     * @param pageNumber
     * @param pageSize
     * @param tag
     * @param tagOperator
     * @param discoveryTrail
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsCertificates(
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
                type: "CERT_RISK";
                name: string;
                categories: Array<string>;
                title: string;
                severity: string;
            }>;
            data: {
                certId: number;
                sha256: string;
                isInUse: boolean;
                ownershipStatus: "OWNED_BY" | "UNKNOWN";
                isValid: boolean;
                isSelfSigned: boolean;
                issuerName: string;
                hostsPresentingCert: Array<{
                    assetId: string;
                    port: number;
                    refUrl: string;
                    lastSeenAt: string;
                }>;
                expirationDate: string;
                namesListedOnCert: Array<string>;
                publicKey: {
                    algorithmName: string;
                    length: number;
                    exponent: number;
                    curve: string | null;
                };
                browserTrust: {
                    apple: boolean;
                    google: boolean;
                    microsoft: boolean;
                    publicKeyType: string;
                    subjectDn: string;
                };
            };
            comments: {
                totalComments: number;
                refUrl: string;
            };
            type: "CERT" | "DOMAIN" | "HOST" | "SUBDOMAIN";
            assetId: string;
            isSeed: boolean;
            tags: Array<{
                name: string;
                color: string;
            }>;
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
            url: "/v1/assets/certificates",
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
     * Retrieve a specified certificate from the system.
     * @param sha256
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsCertificate(sha256: string): CancelablePromise<{
        risks: Array<{
            type: "CERT_RISK";
            name: string;
            categories: Array<string>;
            title: string;
            severity: string;
        }>;
        data: {
            certId: number;
            sha256: string;
            isInUse: boolean;
            ownershipStatus: "OWNED_BY" | "UNKNOWN";
            isValid: boolean;
            isSelfSigned: boolean;
            issuerName: string;
            hostsPresentingCert: Array<{
                assetId: string;
                port: number;
                refUrl: string;
                lastSeenAt: string;
            }>;
            expirationDate: string;
            namesListedOnCert: Array<string>;
            publicKey: {
                algorithmName: string;
                length: number;
                exponent: number;
                curve: string | null;
            };
            browserTrust: {
                apple: boolean;
                google: boolean;
                microsoft: boolean;
                publicKeyType: string;
                subjectDn: string;
            };
        };
        comments: {
            totalComments: number;
            refUrl: string;
        };
        type: "CERT" | "DOMAIN" | "HOST" | "SUBDOMAIN";
        assetId: string;
        isSeed: boolean;
        tags: Array<{
            name: string;
            color: string;
        }>;
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
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/assets/certificates/{sha256}",
            path: {
                sha256: sha256,
            },
        });
    }

    /**
     * Add a comment.
     * @param sha256
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postV1AssetsCertificatesComments(
        sha256: string,
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
            url: "/v1/assets/certificates/{sha256}/comments",
            path: {
                sha256: sha256,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * View all certificate comments.
     * @param sha256
     * @param pageNumber
     * @param pageSize
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsCertificateComments(
        sha256: string,
        pageNumber?: number,
        pageSize?: number
    ): CancelablePromise<{
        comments: Array<{
            type: "CERT";
            sha256: string;
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
            url: "/v1/assets/certificates/{sha256}/comments",
            path: {
                sha256: sha256,
            },
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            },
        });
    }

    /**
     * Delete a specific comment from a certificate
     * @param sha256
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public deleteV1AssetsCertificatesComments(
        sha256: string,
        commentId: number
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/assets/certificates/{sha256}/comments/{commentId}",
            path: {
                sha256: sha256,
                commentId: commentId,
            },
        });
    }

    /**
     * Retrieve the specified comment from the system.
     * @param sha256
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsCertificateComment(
        sha256: string,
        commentId: number
    ): CancelablePromise<{
        type: "CERT";
        sha256: string;
        commentId: number;
        createdOn: string;
        createdBy: string | null;
        markdown: string;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/assets/certificates/{sha256}/comments/{commentId}",
            path: {
                sha256: sha256,
                commentId: commentId,
            },
        });
    }

    /**
     * Add Tag to a certificate
     * @param sha256
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postV1AssetsCertificatesTags(
        sha256: string,
        requestBody: {
            name: string;
            color?: string;
        }
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "POST",
            url: "/v1/assets/certificates/{sha256}/tags",
            path: {
                sha256: sha256,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Delete a tag from a certificate
     * @param sha256
     * @param name
     * @returns any
     * @throws ApiError
     */
    public deleteV1AssetsCertificatesTags(
        sha256: string,
        name: string
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/assets/certificates/{sha256}/tags/{name}",
            path: {
                sha256: sha256,
                name: name,
            },
        });
    }

    /**
     * Retrieve all domains from the system. The `tag` and
     * `tagOperator` params can be used to filter by tag. The `source` param
     * can be used to filter by source. Supported values for `source` are:
     * - "Seed"
     * - "Censys Scan"
     * - "AWS Connector"
     * - "GCP Connector"
     * - "AZURE Connector"
     * @param pageNumber
     * @param pageSize
     * @param tag
     * @param tagOperator
     * @param source
     * @param discoveryTrail
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsDomains(
        pageNumber?: number,
        pageSize?: number,
        tag?: Array<string>,
        tagOperator?: "contains" | "is" | "is not" | "not contains",
        source?: Array<string>,
        discoveryTrail?: boolean
    ): CancelablePromise<{
        pageNumber: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
        assets: Array<{
            risks: Array<{
                type: "DOMAIN_RISK";
                name: string;
                categories: Array<string>;
                title: string;
                severity: string;
            }>;
            source: string | null;
            data: {
                domain: string;
                nameServers: Array<string>;
                mailServers: Array<string>;
                /**
                 * Make all properties in T optional
                 */
                registration: {
                    registrarName?: string;
                    expirationDate?: string;
                };
            };
            comments: {
                totalComments: number;
                refUrl: string;
            };
            type: "CERT" | "DOMAIN" | "HOST" | "SUBDOMAIN";
            assetId: string;
            isSeed: boolean;
            tags: Array<{
                name: string;
                color: string;
            }>;
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
            url: "/v1/assets/domains",
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                tag: tag,
                tagOperator: tagOperator,
                source: source,
                discoveryTrail: discoveryTrail,
            },
        });
    }

    /**
     * Retrieve a specific domain from the system.
     * @param domain
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsDomain(domain: string): CancelablePromise<{
        source: string | null;
        data: {
            domain: string;
            nameServers: Array<string>;
            mailServers: Array<string>;
            /**
             * Make all properties in T optional
             */
            registration: {
                registrarName?: string;
                expirationDate?: string;
            };
        };
        risks: Array<{
            type: "DOMAIN_RISK";
            name: string;
            categories: Array<string>;
            title: string;
            severity: string;
        }>;
        comments: {
            totalComments: number;
            refUrl: string;
        };
        type: "CERT" | "DOMAIN" | "HOST" | "SUBDOMAIN";
        assetId: string;
        isSeed: boolean;
        tags: Array<{
            name: string;
            color: string;
        }>;
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
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/assets/domains/{domain}",
            path: {
                domain: domain,
            },
        });
    }

    /**
     * Add a comment.
     * @param domain
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postV1AssetsDomainsComments(
        domain: string,
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
            url: "/v1/assets/domains/{domain}/comments",
            path: {
                domain: domain,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * View all domain comments.
     * @param domain
     * @param pageNumber
     * @param pageSize
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsDomainsComments(
        domain: string,
        pageNumber?: number,
        pageSize?: number
    ): CancelablePromise<{
        comments: Array<{
            type: "DOMAIN";
            domain: string;
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
            url: "/v1/assets/domains/{domain}/comments",
            path: {
                domain: domain,
            },
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            },
        });
    }

    /**
     * Remove a specific comment from a specific domain.
     * @param domain
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public deleteV1AssetsDomainsComments(
        domain: string,
        commentId: number
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/assets/domains/{domain}/comments/{commentId}",
            path: {
                domain: domain,
                commentId: commentId,
            },
        });
    }

    /**
     * Retrieve the specified comment from the system.
     * @param domain
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsDomainComment(
        domain: string,
        commentId: number
    ): CancelablePromise<{
        type: "DOMAIN";
        domain: string;
        commentId: number;
        createdOn: string;
        createdBy: string | null;
        markdown: string;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/assets/domains/{domain}/comments/{commentId}",
            path: {
                domain: domain,
                commentId: commentId,
            },
        });
    }

    /**
     * Add a tag to a specific domain.
     * @param domain
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postV1AssetsDomainsTags(
        domain: string,
        requestBody: {
            name: string;
            color?: string;
        }
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "POST",
            url: "/v1/assets/domains/{domain}/tags",
            path: {
                domain: domain,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Remove a specific tag from a specific domain.
     * @param domain
     * @param name
     * @returns any
     * @throws ApiError
     */
    public deleteV1AssetsDomainsTags(
        domain: string,
        name: string
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/assets/domains/{domain}/tags/{name}",
            path: {
                domain: domain,
                name: name,
            },
        });
    }

    /**
     * List all subdomains of the parent domain specified in the path
     * @param domain
     * @param pageNumber
     * @param pageSize
     * @param discoveryTrail
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsDomainsSubdomains(
        domain: string,
        pageNumber?: number,
        pageSize?: number,
        discoveryTrail?: boolean
    ): CancelablePromise<{
        subdomains: Array<{
            resolvedHosts: Array<{
                ipAddress: string;
                resolvedAt: string;
                refUrl: string;
            }>;
            subdomain: string;
            tags: Array<{
                label: string;
                tagId: number;
                color: string;
            }>;
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
        pageNumber: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/assets/domains/{domain}/subdomains",
            path: {
                domain: domain,
            },
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                discoveryTrail: discoveryTrail,
            },
        });
    }

    /**
     * Retrieve a specific subdomain from the system.
     * @param domain
     * @param subdomain
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsDomainSubdomain(
        domain: string,
        subdomain: string
    ): CancelablePromise<
        | {
              data: {
                  domain: string;
                  subdomain: string;
                  resolvedHosts: Array<{
                      ipAddress: string;
                      resolvedAt: string;
                      refUrl: string;
                  }>;
              };
              comments: {
                  totalComments: number;
                  refUrl: string;
              };
              associatedAt: string;
              type: "CERT" | "DOMAIN" | "HOST" | "SUBDOMAIN";
              assetId: string;
              isSeed: boolean;
              tags: Array<{
                  name: string;
                  color: string;
              }>;
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
          }
        | {
              data: {
                  domain: string;
                  subdomain: string;
                  resolvedHosts: Array<{
                      ipAddress: string;
                      resolvedAt: string;
                      refUrl: string;
                  }>;
              };
              comments: {
                  totalComments: number;
                  refUrl: string;
              };
              type: "CERT" | "DOMAIN" | "HOST" | "SUBDOMAIN";
              assetId: string;
              isSeed: boolean;
              tags: Array<{
                  name: string;
                  color: string;
              }>;
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
          }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/assets/domains/{domain}/subdomains/{subdomain}",
            path: {
                domain: domain,
                subdomain: subdomain,
            },
        });
    }

    /**
     * Add a comment to a specific subdomain.
     * @param domain
     * @param subdomain
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postV1AssetsDomainsSubdomainsComments(
        domain: string,
        subdomain: string,
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
            url: "/v1/assets/domains/{domain}/subdomains/{subdomain}/comments",
            path: {
                domain: domain,
                subdomain: subdomain,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * View all comments on a specific subdomain.
     * @param domain
     * @param subdomain
     * @param pageNumber
     * @param pageSize
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsDomainsSubdomainComments(
        domain: string,
        subdomain: string,
        pageNumber?: number,
        pageSize?: number
    ): CancelablePromise<{
        comments: Array<{
            type: "SUBDOMAIN";
            subdomain: string;
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
            url: "/v1/assets/domains/{domain}/subdomains/{subdomain}/comments",
            path: {
                domain: domain,
                subdomain: subdomain,
            },
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
            },
        });
    }

    /**
     * Retrieve the specified comment from the system.
     * @param domain
     * @param subdomain
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public getV1AssetsDomainSubdomainComment(
        domain: string,
        subdomain: string,
        commentId: number
    ): CancelablePromise<{
        type: "SUBDOMAIN";
        subdomain: string;
        commentId: number;
        createdOn: string;
        createdBy: string | null;
        markdown: string;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/assets/domains/{domain}/subdomains/{subdomain}/comments/{commentId}",
            path: {
                domain: domain,
                subdomain: subdomain,
                commentId: commentId,
            },
        });
    }

    /**
     * Remove a specific comment from a host.
     * @param domain
     * @param subdomain
     * @param commentId
     * @returns any
     * @throws ApiError
     */
    public deleteV1AssetsDomainsSubdomainsComments(
        domain: string,
        subdomain: string,
        commentId: number
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/assets/domains/{domain}/subdomains/{subdomain}/comments/{commentId}",
            path: {
                domain: domain,
                subdomain: subdomain,
                commentId: commentId,
            },
        });
    }

    /**
     * Add a tag to a specific subdomain.
     * @param domain
     * @param subdomain
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public postV1AssetsDomainsSubdomainsTags(
        domain: string,
        subdomain: string,
        requestBody: {
            name: string;
            color?: string;
        }
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "POST",
            url: "/v1/assets/domains/{domain}/subdomains/{subdomain}/tags",
            path: {
                domain: domain,
                subdomain: subdomain,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Remove a tag from a specific subdomain
     * @param domain
     * @param subdomain
     * @param name
     * @returns any
     * @throws ApiError
     */
    public deleteV1AssetsDomainsSubdomainsTags(
        domain: string,
        subdomain: string,
        name: string
    ): CancelablePromise<any> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v1/assets/domains/{domain}/subdomains/{subdomain}/tags/{name}",
            path: {
                domain: domain,
                subdomain: subdomain,
                name: name,
            },
        });
    }
}
