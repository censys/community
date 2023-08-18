/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class DataService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns data on the types of scans (series) we perform
     * > The Censys legacy v1 API contains API endpoints which are being maintained until replacement v2 endpoints are available.
     *
     * The Get Series endpoint returns a data on the types of scans we regularly perform (series).
     * @returns any We were able to successfully retrieve a list of series.
     * @throws ApiError
     */
    public getSeries(): CancelablePromise<{
        primary_series?: Record<string, string>;
        raw_series?: Record<string, string>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/data",
            errors: {
                429: `Your query was not executed because you have exceeded your specified rate limit.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }

    /**
     * Returns data about a specified scan (series)
     * > The Censys legacy v1 API contains API endpoints which are being maintained until replacement v2 endpoints are available.
     *
     * The View Series endpoint returns data we have about a particular series—a scan of the same protocol and destination across time—including the list of scans.
     * @param series The ID of the series.
     * @returns any We were able to successfully retrieve a series.
     * @throws ApiError
     */
    public viewSeries(series: string): CancelablePromise<{
        id?: string;
        name?: string;
        description?: string;
        results?: {
            historical?: Array<{
                id?: string;
                timestamp?: string;
                details_url?: string;
            }>;
            latest?: {
                id?: string;
                timestamp?: string;
                details_url?: string;
            };
        };
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/data/{series}",
            path: {
                series: series,
            },
            errors: {
                404: `The requested series does not exist.`,
                429: `Your query was not executed because you have exceeded your specified rate limit.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }

    /**
     * Returns data on a particular scan
     * > The Censys legacy v1 API contains API endpoints which are being maintained until replacement v2 endpoints are available.
     *
     * The View Result endpoint returns data on a particular scan (result), as found in the Get Series or View Series endpoints.
     * @param series The ID of the series.
     * @param result The ID of the result.
     * @returns any We were able to successfully retrieve a result.
     * @throws ApiError
     */
    public viewResult(
        series: string,
        result: string
    ): CancelablePromise<{
        id?: string;
        timestamp?: string;
        files?: {
            "zmap-results"?: {
                file_type?: string;
                schema?: any;
                download_path?: string;
                sha256_fingerprint?: string;
                size?: number;
            };
            "zgrab-results"?: Record<string, any>;
            download_path?: string;
            sha256_fingerprint?: string;
            size?: number;
        };
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/data/{series}/{result}",
            path: {
                series: series,
                result: result,
            },
            errors: {
                404: `The requested series or result does not exist.`,
                429: `Your query was not executed because you have exceeded your specified rate limit.`,
                500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
            },
        });
    }
}
