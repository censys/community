/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from "../models/ApiResponse";
import type { Host } from "../models/Host";
import type { HostComment } from "../models/HostComment";
import type { HostEvent } from "../models/HostEvent";
import type { HostHit } from "../models/HostHit";
import type { Tag } from "../models/Tag";
import type { VirtualHostHit } from "../models/VirtualHostHit";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class HostsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns previews of hosts matching a specified search query
     * Accepts queries for host or service attributes provided in the Censys Search Language and returns a list of matching hosts with some summary fields.
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
     * @param q Query used to search for hosts with matching attributes. Uses the Censys Search Language.
     * @param perPage The maximum number of hits to return in each response (minimum of 1, maximum of 100).
     * @param virtualHosts Determine how to query Virtual Hosts. The default is `EXCLUDE` which will ignore any virtual hosts entries.
     * When set to `INCLUDE` or `ONLY` virtual hosts will be present in the returned list of hits, with the later
     * returning only virtual hosts.
     *
     * To learn more, see the [Help Desk article on Virtual Hosts](https://support.censys.io/hc/en-us/articles/4411773845524).
     *
     * @param cursor Cursor token from the API response, which fetches the next or previous page of hits when added to the endpoint URL.
     * @returns any OK
     * @throws ApiError
     */
    public searchHosts(
        q?: string,
        perPage: number = 50,
        virtualHosts: "EXCLUDE" | "INCLUDE" | "ONLY" = "EXCLUDE",
        cursor?: string
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                query?: string;
                total?: number;
                hits?: Array<HostHit | VirtualHostHit>;
            };
            links?: {
                prev?: string;
                next?: string;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/hosts/search",
            query: {
                q: q,
                per_page: perPage,
                virtual_hosts: virtualHosts,
                cursor: cursor,
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
     * Returns aggregation of hosts that match the given query string
     * Aggregates hosts that match the given query string into buckets based on the given field. See help on the Censys Search Language for help on constructing a search query.
     * @param field The field used to aggregated upon and generate buckets for. If the field is a service level field, the aggregation result will be based on services which belong to hosts which match the query, not the hosts themselves.
     * @param q Query used to search for Hosts which will be aggregated. Query uses the Censys Search Language.
     * @param numBuckets The maximum number of buckets used to generate aggregate results.
     * @param virtualHosts Determine how to query Virtual Hosts. The default is `EXCLUDE` which will ignore any virtual hosts entries.
     * When set to `INCLUDE` or `ONLY` virtual hosts will be present in the returned list of hits, with the later
     * returning only virtual hosts.
     *
     * To learn more, see the [Help Desk article on Virtual Hosts](https://support.censys.io/hc/en-us/articles/4411773845524).
     *
     * @returns any OK
     * @throws ApiError
     */
    public aggregateHosts(
        field: string,
        q?: string,
        numBuckets: number = 50,
        virtualHosts: "EXCLUDE" | "INCLUDE" | "ONLY" = "EXCLUDE"
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                total?: number;
                total_omitted?: number;
                potential_deviation?: number;
                buckets?: Array<{
                    key?: string;
                    count?: number;
                }>;
                query?: string;
                field?: string;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/hosts/aggregate",
            query: {
                q: q,
                field: field,
                num_buckets: numBuckets,
                virtual_hosts: virtualHosts,
            },
            errors: {
                400: `Bad Request.`,
                401: `You must authenticate with a valid API ID and secret.`,
                429: `Too many requests.`,
            },
        });
    }

    /**
     * Returns host information for the specified IP address
     * Fetches the entire host entity by IP address and returns the most recent Censys view of the host and its services.
     * @param ip The IP Address of the requested host.
     * @param atTime Fetches the Censys view of a host and its services at the specified point in time. Requires historical API access.
     * Nanosecond precision is allowed. Uses RFC3339 Timestamp.
     * @returns any The host was successfully retrieved.
     * @throws ApiError
     */
    public viewHost(
        ip: string,
        atTime?: string
    ): CancelablePromise<
        ApiResponse & {
            result?: Host & {
                last_updated_at?: string;
                location_updated_at?: string;
                autonomous_system_updated_at?: string;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/hosts/{ip}",
            path: {
                ip: ip,
            },
            query: {
                at_time: atTime,
            },
            errors: {
                401: `You must authenticate with a valid API ID and secret.`,
                422: `Invalid IP address.`,
                429: `Too many requests.`,
            },
        });
    }

    /**
     * Returns a diff of a host against different points in time or against a different host altogether.
     * The diff endpoint generates a JSONPatch (RFC6902) formatted patch by comparing a host against another host (or itself) at
     * optionally given points in time.
     *
     * The host as specified by the IP in the path and the `at_time` parameter is referred to as the original host, or simply "A".
     * The host specified by the parameters `ip_b` and `at_time_b` is referred to as "B".
     *
     * The differential generated provides a sequence of steps needed to transform Host A into Host B.
     *
     * @param ip The IP Address of the original host. Referred to as Host A.
     * @param ipB The IP Address of the other host. If not set, defaults to the host provided in the path. Referred to as Host B.
     * @param atTime The point in time used as the basis for Host A.
     *
     * Requires historical API access.
     * Nanosecond precision is allowed. Uses RFC3339 Timestamp.
     *
     * @param atTimeB The point in time used as the basis for Host B.
     *
     * Requires historical API access.
     * Nanosecond precision is allowed. Uses RFC3339 Timestamp.
     *
     * @returns any A diff was successfully generated for the given host(s).
     * @throws ApiError
     */
    public viewHostDiff(
        ip: string,
        ipB?: string,
        atTime?: string,
        atTimeB?: string
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                a?: {
                    /**
                     * The IP address of the original host.
                     */
                    ip?: string;
                    /**
                     * Returned updated timestamp of the original host.
                     */
                    last_updated_at?: string;
                };
                b?: {
                    /**
                     * The IP address of the other host.
                     */
                    ip?: string;
                    /**
                     * Returned updated timestamp of the other host.
                     */
                    last_updated_at?: string;
                };
                patch?: Array<any>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/hosts/{ip}/diff",
            path: {
                ip: ip,
            },
            query: {
                ip_b: ipB,
                at_time: atTime,
                at_time_b: atTimeB,
            },
            errors: {
                401: `You must authenticate with a valid API ID and secret.`,
                422: `Invalid IP address.`,
                429: `Too many requests.`,
            },
        });
    }

    /**
     * Returns host events for the specified IP address
     * Fetches a list of events for the host with the specified IP address.
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
     * @param ip The IP Address of the requested host.
     * @param startTime An optional RFC3339 timestamp which represents the beginning
     * chronological point-in-time (inclusive) from which events
     * are returned. This must always be earlier than end_time.
     * Precision up to *nanoseconds* is observed and recommended.
     *
     * If not provided, this is assumed to be the historical API maximum.
     *
     * @param endTime An optional RFC3339 timestamp which represents the ending
     * chronological point-in-time (exclusive) from which events
     * are returned. This must always be later than start_time.
     * Precision up to *nanoseconds* is observed and recommended.
     *
     * If not provided, this is assumed to be now.
     *
     * @param perPage The maximum number of hits to return in each response (minimum of 1, maximum of 50).
     * @param cursor Cursor token from the API response, which fetches the next or previous page of hits when added to the endpoint URL.
     * @param reversed Reverse the order of the return events, that is, return events in reversed chronological order.
     * @returns any Events for the host were sucessfully retrieved.
     * @throws ApiError
     */
    public viewHostEvents(
        ip: string,
        startTime?: string,
        endTime?: string,
        perPage: number = 25,
        cursor?: string,
        reversed?: boolean
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                ip?: string;
                events?: Array<HostEvent>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/experimental/hosts/{ip}/events",
            path: {
                ip: ip,
            },
            query: {
                start_time: startTime,
                end_time: endTime,
                per_page: perPage,
                cursor: cursor,
                reversed: reversed,
            },
            errors: {
                401: `You must authenticate with a valid API ID and secret.`,
                422: `Invalid IP address.`,
                429: `Too many requests.`,
            },
        });
    }

    /**
     * Returns host names for the specified IP address
     * Fetches a list of host names for the specified IP address.
     * @param ip The IP Address of the requested host.
     * @param perPage The maximum number of hits to return in each response (minimum of 1, maximum of 1000).
     * @param cursor Cursor token from the API response, which fetches the next page of names when added to the endpoint URL.
     * @returns any The host names were successfully retrieved.
     * @throws ApiError
     */
    public viewHostNames(
        ip: string,
        perPage: number = 100,
        cursor?: string
    ): CancelablePromise<
        ApiResponse & {
            result?: {
                names?: Array<string>;
                links?: {
                    next?: string;
                };
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/hosts/{ip}/names",
            path: {
                ip: ip,
            },
            query: {
                per_page: perPage,
                cursor: cursor,
            },
            errors: {
                401: `You must authenticate with a valid API ID and secret.`,
                429: `Too many requests.`,
            },
        });
    }

    /**
     * Returns a list of comments on the given host.
     * Returns a list of comments on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @returns any OK
     * @throws ApiError
     */
    public getCommentsByHost(ip: string): CancelablePromise<
        ApiResponse & {
            result?: {
                ip?: string;
                comments?: Array<HostComment>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/hosts/{ip}/comments",
            path: {
                ip: ip,
            },
        });
    }

    /**
     * Adds a comment on the given host.
     * Adds a comment on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public addCommentByHost(
        ip: string,
        requestBody: {
            contents?: string;
        }
    ): CancelablePromise<
        ApiResponse & {
            result?: HostComment;
        }
    > {
        return this.httpRequest.request({
            method: "POST",
            url: "/v2/hosts/{ip}/comments",
            path: {
                ip: ip,
            },
            body: requestBody,
            mediaType: "application/json",
            errors: {
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Returns a specific comment on the given host.
     * Returns a specific comment on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param commentId The ID of the requested comment.
     * @returns any OK
     * @throws ApiError
     */
    public getCommentByHost(
        ip: string,
        commentId: string
    ): CancelablePromise<
        ApiResponse & {
            result?: HostComment;
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/hosts/{ip}/comments/{comment_id}",
            path: {
                ip: ip,
                comment_id: commentId,
            },
            errors: {
                404: `Not Found`,
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Updates a specific comment on the given host.
     * Updates a specific comment on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param commentId The ID of the requested comment.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public updateCommentByHost(
        ip: string,
        commentId: string,
        requestBody: {
            contents?: string;
        }
    ): CancelablePromise<
        ApiResponse & {
            result?: HostComment;
        }
    > {
        return this.httpRequest.request({
            method: "PUT",
            url: "/v2/hosts/{ip}/comments/{comment_id}",
            path: {
                ip: ip,
                comment_id: commentId,
            },
            body: requestBody,
            mediaType: "application/json",
            errors: {
                404: `Not Found`,
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Deletes a specific comment on the given host.
     * Deletes a specific comment on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param commentId The ID of the requested comment.
     * @returns void
     * @throws ApiError
     */
    public deleteCommentByHost(
        ip: string,
        commentId: string
    ): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v2/hosts/{ip}/comments/{comment_id}",
            path: {
                ip: ip,
                comment_id: commentId,
            },
            errors: {
                404: `Not Found`,
                422: `Unprocessable Entity`,
            },
        });
    }

    /**
     * Returns host metadata about what Censys scans for
     * The host metadata endpoint returns a list of services Censys scans for. These are the values that can be given as values for the `services.service_name` field in search queries.
     * @returns any The metadata was retrieved.
     * @throws ApiError
     */
    public getHostMetadata(): CancelablePromise<
        ApiResponse & {
            result?: {
                services?: Array<string>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/metadata/hosts",
        });
    }

    /**
     * Returns a list of hosts for a tag
     * Returns a list of hosts for a tag
     * @param id The unique ID of the tag.
     * @returns any OK
     * @throws ApiError
     */
    public listHostsForTag(id: string): CancelablePromise<
        ApiResponse & {
            result?: {
                hosts?: Array<{
                    ip?: string;
                    tagged_at?: string;
                }>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/tags/{id}/hosts",
            path: {
                id: id,
            },
        });
    }

    /**
     * Returns a list of tags on the given host.
     * Returns a list of tags on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @returns any OK
     * @throws ApiError
     */
    public getTagsByHost(ip: string): CancelablePromise<
        ApiResponse & {
            result?: {
                ip?: string;
                tags?: Array<Tag>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/hosts/{ip}/tags",
            path: {
                ip: ip,
            },
        });
    }

    /**
     * Adds a tag on the given host.
     * Adds a tag on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public tagHost(ip: string, id: string): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "PUT",
            url: "/v2/hosts/{ip}/tags/{id}",
            path: {
                ip: ip,
                id: id,
            },
        });
    }

    /**
     * Removes a tag on the given host.
     * Removes a tag on the given host.
     *
     * @param ip The IP Address of the requested host.
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public untagHost(ip: string, id: string): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v2/hosts/{ip}/tags/{id}",
            path: {
                ip: ip,
                id: id,
            },
        });
    }
}
