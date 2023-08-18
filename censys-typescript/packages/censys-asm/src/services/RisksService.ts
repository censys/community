/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class RisksService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Returns a full list of all risks that affect any assets in the
     * system, along with a count of assets affected by each risk.
     *
     * The `environment` param can optionally be used to filter returned risks
     * by any top-level environment ("CLOUD", "SHARED", "OTHER", or "ALL") or
     * subenvironment, while the `cloud` param can optionally be used to filter
     * returned risks specifically for cloud providers. Supported values shown below.
     *
     * For both `environment` and `cloud`:
     * - "anyCloud" and "CLOUD" returns risks in any supported cloud provider
     * - "otherCloud" returns risks not in AWS, GCP, or Azure
     *
     * For `environment`:
     * - "ALL" returns risks for all environments and subenvironments
     * - "SHARED" returns risks for CDNs and Shared Web Hosting
     * - "OTHER" returns risks not already categorized as CLOUD or SHARED
     * @param pageNumber
     * @param pageSize
     * @param cloud
     * @param environment
     * @param includeAcceptedRisks
     * @returns any
     * @throws ApiError
     */
    public getV1Risks(
        pageNumber?: number,
        pageSize?: number,
        cloud?:
            | "Alibaba Cloud"
            | "Amazon AWS"
            | "American Internet Services"
            | "Arvixe"
            | "CLOUD"
            | "Cologix, Inc."
            | "Confluence Networks Inc"
            | "Digital Ocean, Inc"
            | "Google"
            | "Google Cloud"
            | "Hetzner Online"
            | "Huawei Cloud Service"
            | "Internap Corporation"
            | "Microsoft Azure"
            | "Microsoft Corporation"
            | "Oracle Cloud"
            | "SWITCH Communications Group LLC"
            | "SoftLayer Technologies. Inc."
            | "Tencent Cloud"
            | "TierPoint LLC"
            | "US Signal"
            | "Verizon Communications Inc."
            | "anyCloud"
            | "otherCloud",
        environment?:
            | "ALL"
            | "Alibaba Cloud"
            | "Amazon AWS"
            | "American Internet Services"
            | "Arvixe"
            | "CDN"
            | "CLOUD"
            | "Cologix, Inc."
            | "Confluence Networks Inc"
            | "Digital Ocean, Inc"
            | "Google"
            | "Google Cloud"
            | "Hetzner Online"
            | "Huawei Cloud Service"
            | "Internap Corporation"
            | "Microsoft Azure"
            | "Microsoft Corporation"
            | "OTHER"
            | "Oracle Cloud"
            | "SHARED"
            | "SWITCH Communications Group LLC"
            | "Shared Web Hosting"
            | "SoftLayer Technologies. Inc."
            | "Tencent Cloud"
            | "TierPoint LLC"
            | "US Signal"
            | "Verizon Communications Inc."
            | "anyCloud"
            | "otherCloud",
        includeAcceptedRisks?: boolean
    ): CancelablePromise<{
        pageNumber: number;
        pageSize: number;
        totalPages: number;
        totalItems: number;
        environment:
            | "ALL"
            | "Alibaba Cloud"
            | "Amazon AWS"
            | "American Internet Services"
            | "Arvixe"
            | "CDN"
            | "CLOUD"
            | "Cologix, Inc."
            | "Confluence Networks Inc"
            | "Digital Ocean, Inc"
            | "Google"
            | "Google Cloud"
            | "Hetzner Online"
            | "Huawei Cloud Service"
            | "Internap Corporation"
            | "Microsoft Azure"
            | "Microsoft Corporation"
            | "OTHER"
            | "Oracle Cloud"
            | "SHARED"
            | "SWITCH Communications Group LLC"
            | "Shared Web Hosting"
            | "SoftLayer Technologies. Inc."
            | "Tencent Cloud"
            | "TierPoint LLC"
            | "US Signal"
            | "Verizon Communications Inc."
            | "anyCloud"
            | "otherCloud";
        data: Array<
            | {
                  riskInfoId?: number;
                  type: string;
                  name: string;
                  severity: "accepted" | "critical" | "high" | "low" | "medium";
                  isSeverityModified: boolean;
                  categories: Array<string>;
                  affectedAssetsCount: number;
                  assetType: "HOST";
              }
            | {
                  riskInfoId?: number;
                  type: string;
                  name: string;
                  severity: "accepted" | "critical" | "high" | "low" | "medium";
                  isSeverityModified: boolean;
                  categories: Array<string>;
                  affectedAssetsCount: number;
                  assetType: "DOMAIN";
              }
            | {
                  riskInfoId?: number;
                  type: string;
                  name: string;
                  severity: "accepted" | "critical" | "high" | "low" | "medium";
                  isSeverityModified: boolean;
                  categories: Array<string>;
                  affectedAssetsCount: number;
                  assetType: "CERT";
              }
            | {
                  riskInfoId?: number;
                  type: string;
                  name: string;
                  severity: "accepted" | "critical" | "high" | "low" | "medium";
                  isSeverityModified: boolean;
                  categories: Array<string>;
                  affectedAssetsCount: number;
                  assetType: "STORAGE_BUCKET";
              }
        >;
    }> {
        return this.httpRequest.request({
            method: "GET",
            url: "/v1/risks",
            query: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                cloud: cloud,
                environment: environment,
                includeAcceptedRisks: includeAcceptedRisks,
            },
        });
    }
}
