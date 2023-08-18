/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { AxiosHttpRequest } from "./core/AxiosHttpRequest";
import type { BaseHttpRequest } from "./core/BaseHttpRequest";
import type { OpenAPIConfig } from "./core/OpenAPI";

import { AssetsService } from "./services/AssetsService";
import { BetaService } from "./services/BetaService";
import { CloudsService } from "./services/CloudsService";
import { LogbookService } from "./services/LogbookService";
import { RisksService } from "./services/RisksService";
import { SeedsService } from "./services/SeedsService";

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class CensysASM {
    public readonly assets: AssetsService;
    public readonly beta: BetaService;
    public readonly clouds: CloudsService;
    public readonly logbook: LogbookService;
    public readonly risks: RisksService;
    public readonly seeds: SeedsService;

    public readonly request: BaseHttpRequest;

    constructor(
        config?: Partial<OpenAPIConfig>,
        HttpRequest: HttpRequestConstructor = AxiosHttpRequest
    ) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? "https://app.censys.io/api",
            VERSION: config?.VERSION ?? "1",
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? "include",
            API_KEY: config?.API_KEY,
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.assets = new AssetsService(this.request);
        this.beta = new BetaService(this.request);
        this.clouds = new CloudsService(this.request);
        this.logbook = new LogbookService(this.request);
        this.risks = new RisksService(this.request);
        this.seeds = new SeedsService(this.request);
    }
}
