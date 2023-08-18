/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from "../models/ApiResponse";
import type { Tag } from "../models/Tag";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class TagsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns a list of all tags
     * Returns a list of all tags for a team
     * @returns any OK
     * @throws ApiError
     */
    public listTags(): CancelablePromise<
        ApiResponse & {
            result?: {
                tags?: Array<Tag>;
            };
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/tags",
        });
    }

    /**
     * Creates a new tag
     * Creates a new tag for a team
     * @param requestBody Tag to create
     * @returns any OK
     * @throws ApiError
     */
    public createTag(requestBody: Tag): CancelablePromise<
        ApiResponse & {
            result?: Tag;
        }
    > {
        return this.httpRequest.request({
            method: "POST",
            url: "/v2/tags",
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Returns a tag
     * Returns a tag for a team
     * @param id The unique ID of the tag.
     * @returns any OK
     * @throws ApiError
     */
    public getTag(id: string): CancelablePromise<
        ApiResponse & {
            result?: Tag;
        }
    > {
        return this.httpRequest.request({
            method: "GET",
            url: "/v2/tags/{id}",
            path: {
                id: id,
            },
        });
    }

    /**
     * Updates a tag
     * Updates a tag for a team
     * @param id The unique ID of the tag.
     * @param requestBody Tag to update
     * @returns any OK
     * @throws ApiError
     */
    public updateTag(
        id: string,
        requestBody: Tag
    ): CancelablePromise<
        ApiResponse & {
            result?: Tag;
        }
    > {
        return this.httpRequest.request({
            method: "PUT",
            url: "/v2/tags/{id}",
            path: {
                id: id,
            },
            body: requestBody,
            mediaType: "application/json",
        });
    }

    /**
     * Deletes a tag
     * Deletes a tag for a team
     * @param id The unique ID of the tag.
     * @returns void
     * @throws ApiError
     */
    public deleteTag(id: string): CancelablePromise<void> {
        return this.httpRequest.request({
            method: "DELETE",
            url: "/v2/tags/{id}",
            path: {
                id: id,
            },
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
