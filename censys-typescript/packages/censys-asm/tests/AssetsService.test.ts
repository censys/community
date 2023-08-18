import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysASM } from "../src";
import {
    API_KEY,
    BASE_URL_V1,
    CERTIFICATE_SHA256,
    DOMAIN_NAME,
    HEADERS,
    IP_ADDRESS,
    POST_HEADERS,
} from "./utils";

const ASSETS_BASE_URL = BASE_URL_V1 + "/assets/";

const TEST_COMMENT_MD = "This is a test comment";
const TEST_COMMENT = {
    markdown: TEST_COMMENT_MD,
};
const TEST_TAG_NAME = "test_tag";
const TEST_TAG = {
    name: TEST_TAG_NAME,
};

describe("AssetsService", () => {
    let mock: MockAdapter;
    let client: CensysASM;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysASM({ API_KEY });
    });

    afterEach(() => {
        mock.reset();
    });

    it.each([
        // TODO: Add sample responses
        ["hosts", () => client.assets.getV1AssetsHosts(), {}],
        ["domains", () => client.assets.getV1AssetsDomains(), {}],
        ["certificates", () => client.assets.getV1AssetsCertificates(), {}],
    ])("should get V1 Assets %s", async (assetType, method, response) => {
        // Actual call
        const assetsPromise = method();

        // Mock
        mock.onGet(ASSETS_BASE_URL + assetType, undefined, HEADERS).reply(
            200,
            response
        );

        // Assertions
        await expect(assetsPromise).resolves.toEqual(response);
    });

    it.each([
        // TODO: Add sample responses
        [
            "hosts",
            IP_ADDRESS,
            () => client.assets.getV1AssetsHost(IP_ADDRESS),
            {},
        ],
        [
            "domains",
            DOMAIN_NAME,
            () => client.assets.getV1AssetsDomain(DOMAIN_NAME),
            {},
        ],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () => client.assets.getV1AssetsCertificate(CERTIFICATE_SHA256),
            {},
        ],
    ])(
        "should get V1 %s Asset",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onGet(
                ASSETS_BASE_URL + assetType + "/" + assetId,
                undefined,
                HEADERS
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    it.each([
        [
            "hosts",
            IP_ADDRESS,
            () => client.assets.getV1AssetsHostsComments(IP_ADDRESS),
            {},
        ],
        [
            "domains",
            DOMAIN_NAME,
            () => client.assets.getV1AssetsDomainsComments(DOMAIN_NAME),
            {},
        ],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () =>
                client.assets.getV1AssetsCertificateComments(
                    CERTIFICATE_SHA256
                ),
            {},
        ],
    ])(
        "should get V1 Assets %s comments",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onGet(
                ASSETS_BASE_URL + assetType + "/" + assetId + "/comments"
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    it.each([
        [
            "hosts",
            IP_ADDRESS,
            () =>
                client.assets.postV1AssetsHostsComments(
                    IP_ADDRESS,
                    TEST_COMMENT
                ),
            {},
        ],
        [
            "domains",
            DOMAIN_NAME,
            () =>
                client.assets.postV1AssetsDomainsComments(
                    DOMAIN_NAME,
                    TEST_COMMENT
                ),
            {},
        ],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () =>
                client.assets.postV1AssetsCertificatesComments(
                    CERTIFICATE_SHA256,
                    TEST_COMMENT
                ),
            {},
        ],
    ])(
        "should post V1 Assets %s comments",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onPost(
                ASSETS_BASE_URL + assetType + "/" + assetId + "/comments",
                TEST_COMMENT,
                POST_HEADERS
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    // TODO: Write tests for V1 delete asset comment
    it.each([
        [
            "hosts",
            IP_ADDRESS,
            () => client.assets.deleteV1AssetsHostsComments(IP_ADDRESS, 1),
            {},
        ],
        [
            "domains",
            DOMAIN_NAME,
            () => client.assets.deleteV1AssetsDomainsComments(DOMAIN_NAME, 1),
            {},
        ],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () =>
                client.assets.deleteV1AssetsCertificatesComments(
                    CERTIFICATE_SHA256,
                    1
                ),
            {},
        ],
    ])(
        "should delete V1 Assets %s comments",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onDelete(
                ASSETS_BASE_URL + assetType + "/" + assetId + "/comments/1",
                undefined,
                HEADERS
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    // TODO: Write tests for V1 post asset tag
    it.each([
        [
            "hosts",
            IP_ADDRESS,
            () => client.assets.postV1AssetsHostsTags(IP_ADDRESS, TEST_TAG),
            {},
        ],
        [
            "domains",
            DOMAIN_NAME,
            () => client.assets.postV1AssetsDomainsTags(DOMAIN_NAME, TEST_TAG),
            {},
        ],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () =>
                client.assets.postV1AssetsCertificatesTags(
                    CERTIFICATE_SHA256,
                    TEST_TAG
                ),
            {},
        ],
    ])(
        "should post V1 Assets %s tags",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onPost(
                ASSETS_BASE_URL + assetType + "/" + assetId + "/tags",
                TEST_TAG,
                POST_HEADERS
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    // TODO: Write tests for V1 delete asset tag
    it.each([
        [
            "hosts",
            IP_ADDRESS,
            () =>
                client.assets.deleteV1AssetsHostsTags(
                    IP_ADDRESS,
                    TEST_TAG_NAME
                ),
            {},
        ],
        [
            "domains",
            DOMAIN_NAME,
            () =>
                client.assets.deleteV1AssetsDomainsTags(
                    DOMAIN_NAME,
                    TEST_TAG_NAME
                ),
            {},
        ],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () =>
                client.assets.deleteV1AssetsCertificatesTags(
                    CERTIFICATE_SHA256,
                    TEST_TAG_NAME
                ),
            {},
        ],
    ])(
        "should delete V1 Assets %s tags",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onDelete(
                ASSETS_BASE_URL +
                    assetType +
                    "/" +
                    assetId +
                    "/tags/" +
                    TEST_TAG_NAME,
                undefined,
                HEADERS
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    // TODO: Write tests for v1 get asset comment
    it.each([
        [
            "hosts",
            IP_ADDRESS,
            () => client.assets.getV1AssetsHostComment(IP_ADDRESS, 1),
            {},
        ],
        [
            "domains",
            DOMAIN_NAME,
            () => client.assets.getV1AssetsDomainComment(DOMAIN_NAME, 1),
            {},
        ],
        [
            "certificates",
            CERTIFICATE_SHA256,
            () =>
                client.assets.getV1AssetsCertificateComment(
                    CERTIFICATE_SHA256,
                    1
                ),
            {},
        ],
    ])(
        "should get V1 Assets %s comment",
        async (assetType, assetId, method, response) => {
            // Actual call
            const assetsPromise = method();

            // Mock
            mock.onGet(
                ASSETS_BASE_URL + assetType + "/" + assetId + "/comments/1",
                undefined,
                HEADERS
            ).reply(200, response);

            // Assertions
            await expect(assetsPromise).resolves.toEqual(response);
        }
    );

    //TODO: Write tests for v1 get asset domains
});
