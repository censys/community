/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from "../models/ApiResponse";
import type { CertComment } from "../models/CertComment";
import type { CertHit } from "../models/CertHit";
import type { CertificateV2 } from "../models/CertificateV2";
import type { Tag } from "../models/Tag";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class CertificatesV2Service {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns the certificate record for the specified SHA-256 fingerprint.
     * Fetches the certificate record for the specified SHA-256 fingerprint, including parsed data, certificate transparency log information, root store trust information, zlint results, and Censys observation metadata.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @returns any OK
     * @throws ApiError
     */
    public getCertByFingerprint(fingerprint: string): CancelablePromise<
        ApiResponse & {
            result?: CertificateV2;
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/certificates/{fingerprint}",
            path: {
                fingerprint: fingerprint,
            },
            errors: {
                400: `Bad Request.`,
                401: `You must authenticate with a valid API ID and secret.`,
                422: `Invalid SHA-256 fingerprint.`,
                429: `Too many requests.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }

    /**
     * Returns certificate records for up to 1000 specified SHA-256 fingerprints.
     * Fetches the certificate records for the specified SHA-256 fingerprints, including parsed data, certificate transparency log information, root store trust information, zlint results, and Censys observation metadata.
     *
     * Each requested certificate will be available as a key in the response, regardless of whether or not we know anything about them. Any certificates which we don't know anything about will be replaced by an error, as shown at the top of the example below.
     * @param fingerprints The SHA-256 fingerprints of the requested certificate records.
     * @returns any OK
     * @throws ApiError
     */
    public getBulkCerts(fingerprints: Array<string>): CancelablePromise<
        ApiResponse & {
            result?: Array<CertificateV2>;
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/certificates/bulk",
            query: {
                fingerprints: fingerprints,
            },
            errors: {
                400: `Bad Request.`,
                401: `You must authenticate with a valid API ID and secret.`,
                422: `Invalid SHA-256 fingerprint.`,
                429: `Too many requests.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }

    /**
     * Returns certificate records for up to 1000 specified SHA-256 fingerprints.
     * Fetches the certificate records for the specified SHA-256 fingerprints, including parsed data, certificate transparency log information, root store trust information, zlint results, and Censys observation metadata.
     *
     * Each requested certificate will be available as a key in the response, regardless of whether or not we know anything about them. Any certificates which we don't know anything about will be replaced by an error, as shown at the top of the example below.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public postBulkCerts(requestBody: {
        /**
         * The SHA-256 fingerprints of the requested certificate records.
         */
        fingerprints?: Array<string>;
    }): CancelablePromise<
        ApiResponse & {
            result?: Array<CertificateV2>;
        }
    > {
        return this.httpRequest.request({
            method: "POST",
            url: "/v2/certificates/bulk",
            body: requestBody,
            mediaType: "application/json",
            errors: {
                400: `Bad Request.`,
                401: `You must authenticate with a valid API ID and secret.`,
                422: `Invalid SHA-256 fingerprint.`,
                429: `Too many requests.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }

    /**
     * Returns previews of certificate records matching a specified query.
     * Accepts queries for certificate attributes provided in the Censys Search Language and returns a list of matching certificates with some summary fields.
     *
     * **Cursor Pagination**
     *
     * Search endpoints rely on using cursors for efficient pagination.
     *
     * Each search result may return a `next` and `prev` cursor value which can be used to fetch additional pages of results.
     *
     * ```json
     * {
     * "links":{
     * "prev":"prevCursorToken",
     * "next":"nextCursorToken"
     * },
     * [Rest of Response]
     * }
     * ```
     * The returned cursor token values can be added to the search endpoint as a `cursor` parameter to fetch either the next page of results or the previous page.
     *
     * The entire set of results can be iterated page-by-page using returned cursors. If no cursor is given, the first page will be returned.
     * @param q Query used to search for certificates with matching attributes. Uses the Censys Search Language.
     * @param perPage The maximum number of hits to return in each response (minimum of 1, maximum of 100).
     * @param cursor Cursor token from the API response, which fetches the next or previous page of hits when added to the endpoint URL.
     * @param fields Additional fields to return in the matched certificates outside of the default returned fields.
     * For a list of additional fields to search on take a look at the data definition for the certs2 model.
     *
     * @param sort A list of fields to sort on. By default, fields will be sorted in ascending order. To sort in
     * descending order, prepend a '-' to the field name, ie: '-fingerprint_sha256'
     *
     * @returns any OK
     * @throws ApiError
     */
    public getSearchCertificates(
        q?: string,
        perPage: number = 50,
        cursor?: string,
        fields?: Array<string>,
        sort?: Array<string>
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                query?: string;
                total?: number;
                duration_ms?: number;
                hits?: Array<CertHit>;
            };
            links?: {
                prev?: string;
                next?: string;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/certificates/search",
            query: {
                q: q,
                per_page: perPage,
                cursor: cursor,
                fields: fields,
                sort: sort,
            },
            errors: {
                400: `Bad Request.`,
                401: `You must authenticate with a valid API ID and secret.`,
                422: `Invalid cursor.`,
                429: `Too many requests.`,
            },
        });
    }

    /**
     * Returns previews of certificates matching a specified search query.
     * Accepts queries for certificate attributes provided in the Censys Search Language and returns a list of matching certificates with some summary fields.
     *
     * **Cursor Pagination**
     *
     * Search endpoints rely on using cursors for efficient pagination.
     *
     * Each search result may return a `next` and `prev` cursor value which can be used to fetch additional pages of results.
     *
     * ```json
     * {
     * "links":{
     * "prev":"prevCursorToken",
     * "next":"nextCursorToken"
     * },
     * [Rest of Response]
     * }
     * ```
     * The returned cursor token values can be added to the search endpoint as a `cursor` parameter to fetch either the next page of results or the previous page.
     *
     * The entire set of results can be iterated page-by-page using returned cursors. If no cursor is given, the first page will be returned.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public postSearchCertificates(requestBody: {
        /**
         * Query used to search for certificates with matching attributes. Uses the Censys Search Language.
         */
        q?: string;
        /**
         * The maximum number of hits to return in each response (minimum of 1, maximum of 100).
         */
        per_page?: number;
        /**
         * Cursor token from the API response, which fetches the next or previous page of hits when added to the endpoint URL.
         */
        cursor?: string;
        /**
         * Additional fields to return in the matched certificates outside of the default returned fields.
         * For a list of additional fields to search on take a look at the data definition for the certs2 model.
         *
         */
        fields?: Array<string>;
        /**
         * A list of fields to sort on. By default, fields will be sorted in ascending order. To sort in
         * descending order, prepend a '-' to the field name, ie: '-fingerprint_sha256'
         *
         */
        sort?: Array<string>;
    }): CancelablePromise<
        ApiResponse & {
            result?: {
                query?: string;
                total?: number;
                duration_ms?: number;
                hits?: Array<CertHit>;
            };
            links?: {
                prev?: string;
                next?: string;
            };
        }
    > {
        return this.httpRequest.request({
            method: "POST",
            url: "/v2/certificates/search",
            body: requestBody,
            mediaType: "application/json",
            errors: {
                400: `Bad Request.`,
                401: `You must authenticate with a valid API ID and secret.`,
                422: `Invalid cursor.`,
                429: `Too many requests.`,
            },
        });
    }

    /**
     * Returns aggregation of certificates that match the given query string.
     * Aggregates certificate records matching a specified query into buckets based on the given field.
     * See help on the Censys Search Language for help on constructing a search query.
     *
     * @param field The field used to aggregated upon and generate buckets for. Buckets will be sorted in descending order from most commonly occuring value to the least based on the number of buckets requested.
     * @param q Query used to search for Certificates which will be aggregated. Query uses the Censys Search Language.
     * @param numBuckets The maximum number of buckets used to generate aggregate results.
     * @returns any OK
     * @throws ApiError
     */
    public aggregateCertificates(
        field: string,
        q?: string,
        numBuckets: number = 50
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                query?: string;
                field?: string;
                total?: number;
                duration_ms?: number;
                buckets?: Array<{
                    key?: string;
                    count?: number;
                }>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/certificates/aggregate",
            query: {
                q: q,
                field: field,
                num_buckets: numBuckets,
            },
            errors: {
                400: `Bad Request.`,
                401: `You must authenticate with a valid API ID and secret.`,
                429: `Too many requests.`,
            },
        });
    }

    /**
     * Returns a list of hosts presenting the given certificate.
     * Returns a list of hosts which contain services presenting this certificate,
     * including when the certificate was first observed.
     *
     * **Cursor Pagination**
     *
     * This endpoint relies on using cursors for efficient pagination. Each result may
     * return a `next` cursor value which can be used to fetch additional pages of results.
     * This endpoint only support forward-pagination.
     *
     * ```json
     * {
     * "links": {
     * "next": "nextCursorToken"
     * },
     * [Rest of Response]
     * }
     * ```
     * The returned cursor token values can be added to the endpoint as a `cursor`
     * parameter to fetch the next page of results.
     * The entire set of results can be iterated page-by-page using returned
     * cursors. If no cursor is given, the first page will be returned.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param cursor Cursor token from the API response, which fetches the next page of hosts when added to the endpoint URL.
     * @returns any OK
     * @throws ApiError
     */
    public getHostsByCert(
        fingerprint: string,
        cursor?: string
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                /**
                 * The SHA-256 fingerprint of the certificate.
                 */
                fingerprint?: string;
                hosts?: Array<{
                    ip?: string;
                    /**
                     * Name provided if host is a virtual host.
                     */
                    name?: string;
                    /**
                     * Time when certificate was observed.
                     */
                    observed_at?: string;
                    /**
                     * Time when the certificate was first observed.
                     */
                    first_observed_at?: string;
                }>;
                links?: {
                    next?: string;
                };
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/certificates/{fingerprint}/hosts",
            path: {
                fingerprint: fingerprint,
            },
            query: {
                cursor: cursor,
            },
            errors: {
                429: `Too many requests.`,
            },
        });
    }

    /**
     * Returns a list of comments on the given cert.
     * Returns a list of comments on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @returns any OK
     * @throws ApiError
     */
    public getCommentsByCert(fingerprint: string): CancelablePromise<
        ApiResponse & {
            result?: {
                fingerprint?: string;
                comments?: Array<CertComment>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/certificates/{fingerprint}/comments",
            path: {
                fingerprint: fingerprint,
            },
        });
    }

    /**
     * Adds a comment on the given cert.
     * Adds a comment on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public addCommentByCert(
        fingerprint: string,
        requestBody: {
            contents?: string;
        }
    ): CancelablePromise<
        ApiResponse & {
            result?: CertComment;
        }
    > {
        return this.httpRequest.request({
            method: "POST",
            url: "/v2/certificates/{fingerprint}/comments",
            path: {
                fingerprint: fingerprint,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Returns a comment on the given cert.
     * Returns a comment on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param commentId The ID of the requested comment.
     * @returns any OK
     * @throws ApiError
     */
    public getCommentByCert(
        fingerprint: string,
        commentId: string
    ): CancelablePromise<
        ApiResponse & {
            result?: CertComment;
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/certificates/{fingerprint}/comments/{comment_id}",
            path: {
                fingerprint: fingerprint,
                comment_id: commentId,
            },
        });
    }

    /**
     * Updates a comment on the given cert.
     * Updates a comment on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param commentId The ID of the requested comment.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public updateCommentByCert(
        fingerprint: string,
        commentId: string,
        requestBody: {
            contents?: string;
        }
    ): CancelablePromise<
        ApiResponse & {
            result?: CertComment;
        }
    > {
        return this.httpRequest.request({
            method: "PUT",
            url: "/v2/certificates/{fingerprint}/comments/{comment_id}",
            path: {
                fingerprint: fingerprint,
                comment_id: commentId,
            },
            body: requestBody,
            mediaType: "application/json",
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Deletes a comment on the given cert.
     * Deletes a comment on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param commentId The ID of the requested comment.
     * @returns any OK
     * @throws ApiError
     */
    public deleteCommentByCert(
        fingerprint: string,
        commentId: string
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                fingerprint?: string;
                comments?: Array<CertComment>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v2/certificates/{fingerprint}/comments/{comment_id}",
            path: {
                fingerprint: fingerprint,
                comment_id: commentId,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Returns a list of certificates for a tag
     * Returns a list of certificates for a tag
     * @param id The unique ID of the tag.
     * @returns any OK
     * @throws ApiError
     */
    public listCertificatesForTag(id: string): CancelablePromise<
        ApiResponse & {
            result?: {
                certs?: Array<{
                    fingerprint?: string;
                    tagged_at?: string;
                }>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/tags/{id}/certificates",
            path: {
                id: id,
            },
        });
    }

    /**
     * Returns a list of tags on the given certificate.
     * Returns a list of tags on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @returns any OK
     * @throws ApiError
     */
    public getTagsByCert(fingerprint: string): CancelablePromise<
        ApiResponse & {
            result?: {
                fingerprint?: string;
                tags?: Array<Tag>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/certificates/{fingerprint}/tags",
            path: {
                fingerprint: fingerprint,
            },
        });
    }

    /**
     * Adds a tag on the given certificate.
     * Adds a tag on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public tagCert(fingerprint: string, id: string): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "PUT",
            url: "/v2/certificates/{fingerprint}/tags/{id}",
            path: {
                fingerprint: fingerprint,
                id: id,
            },
        });
    }

    /**
     * Removes a tag on the given certificate.
     * Removes a tag on the given certificate.
     *
     * @param fingerprint The SHA-256 fingerprint of the requested certificate.
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public untagCert(fingerprint: string, id: string): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v2/certificates/{fingerprint}/tags/{id}",
            path: {
                fingerprint: fingerprint,
                id: id,
            },
        });
    }
}
