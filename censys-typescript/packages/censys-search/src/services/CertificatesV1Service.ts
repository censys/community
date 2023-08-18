/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Certificate } from "../models/Certificate";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class CertificatesV1Service {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns structured certificate data for the specified SHA-256 fingerprint
     * > The Censys legacy v1 API contains API endpoints which are being maintained until replacement v2 endpoints are available.
     *
     * The view endpoint returns the current structured data we have on a specific certificate.
     * @param sha256 The SHA-256 fingerprint of the requested certificate.
     * @returns Certificate The record was successfully retrieved.
     * @throws ApiError
     */
    public viewCertificate(sha256: string): CancelablePromise<Certificate> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/view/certificates/{sha256}",
            path: {
                sha256: sha256,
            },
            errors: {
                404: `The requested record does not exist.`,
                429: `Your query was not executed because you have exceeded your specified rate limit.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }

    /**
     * Returns a list of certificates that match the given query
     * > The Censys legacy v1 API contains API endpoints which are being maintained until replacement v2 endpoints are available.
     *
     * The search endpoint allows searches against the current data in the Certificates index using the [legacy search syntax](https://search.censys.io/certificates/help). The endpoint returns a paginated result set of hosts (or websites or certificates) that match the search. Data should be posted as a JSON request document.
     * @param requestBody
     * @returns any The search or query executed successfully.
     * @throws ApiError
     */
    public searchCertificates(requestBody: {
        query?: string;
        page?: number;
        fields?: Array<string>;
        flatten?: boolean;
    }): CancelablePromise<{
        status?: string;
        metadata?: {
            count?: number;
            query?: string;
            page?: number;
            pages?: number;
        };
        results?: Array<Certificate>;
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/v1/search/certificates",
            body: requestBody,
            mediaType: "application/json",
            errors: {
                400: `Your query could not be executed (e.g., query could not be parsed or timed out.)`,
                404: `Specified search index was not valid.`,
                429: `Your query was not executed because you have exceeded your specified rate limit.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }

    /**
     * Returns a report for the given query
     * > The Censys legacy v1 API contains API endpoints which are being maintained until replacement v2 endpoints are available.
     *
     * The build report endpoint lets you run aggregate reports on the breakdown of a field in a result set analogous to the "Build Report" functionality in the front end.
     * @param requestBody
     * @returns any The report was successfully generated.
     * @throws ApiError
     */
    public generateCertificateReport(requestBody: {
        query?: string;
        field?: string;
        buckets?: number;
    }): CancelablePromise<{
        status?: string;
        results?: Array<{
            key?: string;
            doc_count?: number;
        }>;
        metadata?: {
            query?: string;
            count?: number;
            buckets?: number;
            backend_time?: number;
            nonnull_count?: number;
            other_result_count?: number;
            error_bound?: number;
        };
    }> {
        return this.httpRequest.request({
            method: "POST",
            url: "/v1/report/certificates",
            body: requestBody,
            mediaType: "application/json",
            errors: {
                400: `Your query could not be executed (e.g., query could not be parsed or timed out.)`,
                429: `Your query was not executed because you have exceeded your specified rate limit.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }

    /**
     * Returns structured data about certificates in bulk for the specified SHA-256 fingerprints
     * > The Censys legacy v1 API contains API endpoints which are being maintained until replacement v2 endpoints are available.
     *
     * The bulk endpoint returns, in bulk, the current structured data on many specific certificates.
     *
     * Each requested certificate will be available as a key in the response, regardless of whether or not we know anything about them. Any certificates which we don't know anything about will be replaced by an error, as shown at the top of the example below.
     * @param requestBody
     * @returns string The records were successfully retrieved.
     * @throws ApiError
     */
    public bulkCertificateLookup(requestBody: {
        fingerprints?: Array<string>;
    }): CancelablePromise<Record<string, string>> {
        return this.httpRequest.request({
            method: "POST",
            url: "/v1/bulk/certificates",
            body: requestBody,
            mediaType: "application/json",
            errors: {
                429: `Your query was not executed because you have exceeded your specified rate limit.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }
}
