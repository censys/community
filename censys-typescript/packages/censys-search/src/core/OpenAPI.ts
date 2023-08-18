/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApiRequestOptions } from "./ApiRequestOptions";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    CREDENTIALS: "include" | "omit" | "same-origin";
    TOKEN?: string | Resolver<string>;
    USERNAME?: string | Resolver<string>;
    PASSWORD?: string | Resolver<string>;
    API_ID?: string | Resolver<string>;
    API_SECRET?: string | Resolver<string>;
    HEADERS?: Headers | Resolver<Headers>;
    ENCODE_PATH?: (path: string) => string;
};

export const OpenAPI: OpenAPIConfig = {
    BASE: "https://search.censys.io/api",
    VERSION: "2.0",
    WITH_CREDENTIALS: false,
    CREDENTIALS: "include",
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    API_ID: undefined,
    API_SECRET: undefined,
    HEADERS: undefined,
    ENCODE_PATH: undefined,
};
