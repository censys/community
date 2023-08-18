/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiResponse } from "../models/ApiResponse";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class MetadataService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

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
}
