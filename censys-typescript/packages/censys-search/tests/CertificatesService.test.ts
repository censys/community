import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysSearch } from "../src";
import {
    BASE_URL_V1,
    CERTIFICATE_SHA256,
    CLIENT_CONFIG,
    HEADERS,
    POST_HEADERS,
} from "./utils";

const VIEW_PATH = BASE_URL_V1 + "/view/certificates/";
const SEARCH_PATH = BASE_URL_V1 + "/search/certificates";
const REPORT_PATH = BASE_URL_V1 + "/report/certificates";
const BULK_PATH = BASE_URL_V1 + "/bulk/certificates";

const VIEW_CERTIFICATE_RES = {
    raw: "test",
    parsed: {
        fingerprint_sha1: "test",
        fingerprint_sha256: CERTIFICATE_SHA256,
        fingerprint_md5: "test",
        serial_number: "test",
        subject_key_info: undefined,
        names: [],
        subject_dn: "test",
        subject: undefined,
        issuer_dn: "test",
        issuer: undefined,
        signature: undefined,
        redacted: true,
        validity: undefined,
        version: 1,
        extensions: undefined,
    },
    ct: undefined,
};
const BULK_VIEW_REQ = {
    fingerprints: [CERTIFICATE_SHA256],
};
const BULK_CERTIFICATE_RES = {
    key: "value",
};
const CERTIFICATE_QUERY = "parsed.fingerprint_sha256: " + CERTIFICATE_SHA256;
const SEARCH_REQ = {
    query: CERTIFICATE_QUERY,
    page: 1,
    fields: [],
    flatten: true,
};
const SEARCH_CERTIFICATE_RES = {
    status: "ok",
    metadata: {
        count: 1,
        query: SEARCH_REQ.query,
        page: SEARCH_REQ.page,
        pages: 1,
    },
    results: [VIEW_CERTIFICATE_RES],
};
const CERT_REPORT_REQ = {
    query: CERTIFICATE_QUERY,
    field: "test",
    buckets: 1,
};
const CERT_REPORT_RES = {
    status: "test",
    results: ["test", 1],
    metadata: {
        query: CERT_REPORT_REQ.query,
        count: 1,
        buckets: CERT_REPORT_REQ.buckets,
        backend_time: 1,
        nonnull_count: 1,
        other_result_count: 1,
        error_bound: 1,
    },
};

const VIEW_ERRORS = {
    404: `The requested record does not exist.`,
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
};
const SEARCH_ERRORS = {
    400: `Your query could not be executed (e.g., query could not be parsed or timed out.)`,
    404: `Specified search index was not valid.`,
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
};
const REPORT_ERRORS = {
    400: `Your query could not be executed (e.g., query could not be parsed or timed out.)`,
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
};
const BULK_VIEW_ERRORS = {
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: `An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.`,
};

describe("CertificatesService", () => {
    let mock: MockAdapter;
    let client: CensysSearch;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysSearch(CLIENT_CONFIG);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return structured certificate data for the specified SHA-256 fingerprint", async () => {
        // Actual call
        const certificatePromise =
            client.certificatesV1.viewCertificate(CERTIFICATE_SHA256);

        // Mock
        mock.onGet(VIEW_PATH + CERTIFICATE_SHA256, undefined, HEADERS).reply(
            200,
            VIEW_CERTIFICATE_RES
        );

        // Assertions
        await expect(certificatePromise).resolves.toEqual(VIEW_CERTIFICATE_RES);
    });

    it.each([
        [404, VIEW_ERRORS[404]],
        [429, VIEW_ERRORS[429]],
        [500, VIEW_ERRORS[500]],
    ])("should throw a %i error", async (status, errorMessage) => {
        // Actual call
        const certificatePromise =
            client.certificatesV1.viewCertificate(CERTIFICATE_SHA256);

        // Mock
        mock.onGet(VIEW_PATH + CERTIFICATE_SHA256, undefined, HEADERS).reply(
            status
        );

        // Assertions
        await expect(certificatePromise).rejects.toThrowError(errorMessage);
    });

    it("should return a list of certificates", async () => {
        // Actual call
        const certificatesPromise =
            client.certificatesV1.searchCertificates(SEARCH_REQ);

        // Mock
        mock.onPost(SEARCH_PATH, SEARCH_REQ, POST_HEADERS).reply(
            200,
            SEARCH_CERTIFICATE_RES
        );

        // Assertions
        await expect(certificatesPromise).resolves.toEqual(
            SEARCH_CERTIFICATE_RES
        );
    });

    it.each([
        [400, SEARCH_ERRORS[400]],
        [404, SEARCH_ERRORS[404]],
        [429, SEARCH_ERRORS[429]],
        [500, SEARCH_ERRORS[500]],
    ])("should throw a %i error", async (status, errorMessage) => {
        // Actual call
        const certificatePromise =
            client.certificatesV1.searchCertificates(SEARCH_REQ);

        // Mock
        mock.onPost(SEARCH_PATH, SEARCH_REQ, POST_HEADERS).reply(status);

        // Assertions
        await expect(certificatePromise).rejects.toThrowError(errorMessage);
    });

    it("should generate certificate report", async () => {
        // Actual call
        const certificatePromise =
            client.certificatesV1.generateCertificateReport(CERT_REPORT_REQ);

        // Mock
        mock.onPost(REPORT_PATH, CERT_REPORT_REQ, POST_HEADERS).reply(
            200,
            CERT_REPORT_RES
        );

        // Assertions
        await expect(certificatePromise).resolves.toEqual(CERT_REPORT_RES);
    });

    it.each([
        [400, REPORT_ERRORS[400]],
        [429, REPORT_ERRORS[429]],
        [500, REPORT_ERRORS[500]],
    ])("should throw a %i error", async (status, errorMessage) => {
        // Actual call
        const certificatePromise =
            client.certificatesV1.generateCertificateReport(CERT_REPORT_REQ);

        // Mock
        mock.onPost(REPORT_PATH, CERT_REPORT_REQ, POST_HEADERS).reply(status);

        // Assertions
        await expect(certificatePromise).rejects.toThrowError(errorMessage);
    });

    it("should return bulk structured certificate data for the specified SHA-256 fingerprints", async () => {
        // Actual call
        const certificatePromise =
            client.certificatesV1.bulkCertificateLookup(BULK_VIEW_REQ);

        // Mock
        mock.onPost(BULK_PATH, BULK_VIEW_REQ, POST_HEADERS).reply(
            200,
            BULK_CERTIFICATE_RES
        );

        // Assertions
        await expect(certificatePromise).resolves.toEqual(BULK_CERTIFICATE_RES);
    });
    it.each([
        [429, BULK_VIEW_ERRORS[429]],
        [500, BULK_VIEW_ERRORS[500]],
    ])("should throw a %i error", async (status, errorMessage) => {
        // Actual call
        const certificatePromise =
            client.certificatesV1.bulkCertificateLookup(BULK_VIEW_REQ);

        // Mock
        mock.onPost(BULK_PATH, BULK_VIEW_REQ, POST_HEADERS).reply(status);

        // Assertions
        await expect(certificatePromise).rejects.toThrowError(errorMessage);
    });
});
