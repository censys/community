import { name, version } from "../package.json";

export const BASE_URL = "https://app.censys.io/api";
export const BASE_URL_V1 = `${BASE_URL}/v1`;
export const BASE_URL_V2 = `${BASE_URL}/v2`;
export const API_KEY = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
export const USER_AGENT = `censys-typescript/${version} (${name})`;
export const HEADERS = {
    Accept: "application/json",
    "User-Agent": USER_AGENT,
    "Censys-Api-Key": API_KEY,
};
export const POST_HEADERS = {
    ...HEADERS,
    "Content-Type": "application/json",
};
export const IP_ADDRESS = "8.8.8.8";
export const DOMAIN_NAME = "google.com";
export const CERTIFICATE_SHA256 =
    "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7";
