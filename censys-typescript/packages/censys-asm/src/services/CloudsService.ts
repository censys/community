/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class CloudsService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Retrieve host counts by cloud. Hosts found after the date provided
     * in the `since` parameter will be included in the new asset counts.
     * This parameter should be in ISO 8601 format, for example YYYY-MM-DD.
     * @param since
     * @returns any
     * @throws ApiError
     */
    public getV1CloudsHostCounts(since: string): CancelablePromise<{
        totalAssetCount: number;
        totalNewAssetCount: number;
        totalCloudAssetCount: number;
        totalCloudNewAssetCount: number;
        assetCountByProvider: Array<{
            cloudProvider: string;
            assetCount: number;
            newAssetCount: number;
        }>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/clouds/hostCounts/{since}",
            path: {
                since: since,
            },
        });
    }

    /**
     * Retrieve domain counts by cloud. Domains found after the date provided
     * in the `since` parameter will be included in the new asset counts.
     * This parameter should be in ISO 8601 format, for example YYYY-MM-DD.
     * @param since
     * @returns any
     * @throws ApiError
     */
    public getV1CloudsDomainCounts(since: string): CancelablePromise<{
        totalAssetCount: number;
        totalNewAssetCount: number;
        totalCloudAssetCount: number;
        totalCloudNewAssetCount: number;
        assetCountByProvider: Array<{
            cloudProvider: string;
            assetCount: number;
            newAssetCount: number;
        }>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/clouds/domainCounts/{since}",
            path: {
                since: since,
            },
        });
    }

    /**
     * Retrieve object store counts by cloud. Object stores found after the date
     * provided in the `since` parameter will be included in the new asset counts.
     * This parameter should be in ISO 8601 format, for example YYYY-MM-DD.
     * @param since
     * @param source
     * @returns any
     * @throws ApiError
     */
    public getV1CloudsObjectStoreCounts(
        since: string,
        source?: "CENSYS_SCAN" | "CLOUD_CONNECTOR"
    ): CancelablePromise<{
        totalAssetCount: number;
        totalNewAssetCount: number;
        totalCloudAssetCount: number;
        totalCloudNewAssetCount: number;
        assetCountByProvider: Array<{
            cloudProvider: string;
            assetCount: number;
            newAssetCount: number;
        }>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/clouds/objectStoreCounts/{since}",
            path: {
                since: since,
            },
            query: {
                source: source,
            },
        });
    }

    /**
     * Retrieve subdomain counts by cloud. Subdomains found after the date
     * provided in the `since` parameter will be included in the new asset counts.
     * This parameter should be in ISO 8601 format, for example YYYY-MM-DD.
     * @param since
     * @returns any
     * @throws ApiError
     */
    public getV1CloudsSubdomainCounts(since: string): CancelablePromise<{
        totalAssetCount: number;
        totalNewAssetCount: number;
        totalCloudAssetCount: number;
        totalCloudNewAssetCount: number;
        assetCountByProvider: Array<{
            cloudProvider: string;
            assetCount: number;
            newAssetCount: number;
        }>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/clouds/subdomainCounts/{since}",
            path: {
                since: since,
            },
        });
    }

    /**
     * Retrieve known and unknown counts for hosts by cloud.
     * @returns any
     * @throws ApiError
     */
    public getV1CloudsUnknownCounts(): CancelablePromise<{
        totalKnownCount: number;
        totalUnknownCount: number;
        totalKnownCloudCount: number;
        totalUnknownCloudCount: number;
        countByProvider: Array<{
            cloudProvider: string;
            knownCount: number;
            unknownCount: number;
        }>;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/clouds/unknownCounts",
        });
    }
}
