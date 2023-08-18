import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysSearch } from "../src";
import {
    BASE_URL_V2,
    CERTIFICATE_SHA256,
    CLIENT_CONFIG,
    HEADERS,
    IP_ADDRESS,
    POST_HEADERS,
} from "./utils";

const TAG_ID = "123";
const TAG_NAME = "test_tag";
const TAG_COLOR = "#ffffff";
const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};
const TAG = {
    id: TAG_ID,
    name: TAG_NAME,
    metadata: {
        color: TAG_COLOR,
    },
    created_at: "01-01-2022",
    updated_at: "01-01-2022",
};
const LIST_TAGS_RES = {
    ...API_RESPONSE,
    result: {
        tags: [TAG],
    },
};
const CREATE_TAG_RES = {
    ...API_RESPONSE,
    result: TAG,
};
const LIST_HOSTS_FOR_TAG_RES = {
    ...API_RESPONSE,
    result: {
        hosts: [
            {
                ip: IP_ADDRESS,
                tagged_at: "01-01-2022",
            },
        ],
    },
};
const LIST_CERTS_FOR_TAG_RES = {
    ...API_RESPONSE,
    result: {
        certs: [
            {
                fingerprint: CERTIFICATE_SHA256,
                tagged_at: "01-01-2022",
            },
        ],
    },
};
const GET_TAGS_BY_HOST_RES = {
    ...API_RESPONSE,
    result: {
        ip: IP_ADDRESS,
        tags: [TAG],
    },
};
const GET_TAGS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: CERTIFICATE_SHA256,
        tags: [TAG],
    },
};

describe("TagsService", () => {
    let mock: MockAdapter;
    let client: CensysSearch;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysSearch(CLIENT_CONFIG);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return a list of all tags", async () => {
        // Actual call
        const tagsPromise = client.tags.listTags();

        // Mock
        mock.onGet(BASE_URL_V2 + "/tags", undefined, HEADERS)
            .reply(200, LIST_TAGS_RES)
            .onAny()
            .reply((config) => {
                console.log(config);
                return [200, API_RESPONSE];
            });

        // Assertions
        await expect(tagsPromise).resolves.toEqual(LIST_TAGS_RES);
    });

    it("should create a new tag", async () => {
        // Actual call
        const tagsPromise = client.tags.createTag(TAG);

        // Mock
        mock.onPost(BASE_URL_V2 + "/tags", TAG, POST_HEADERS).reply(
            200,
            CREATE_TAG_RES
        );

        // Assertions
        await expect(tagsPromise).resolves.toEqual(CREATE_TAG_RES);
    });

    it("should return a tag", async () => {
        // Actual call
        const tagsPromise = client.tags.getTag(TAG_ID);

        // Mock
        mock.onGet(BASE_URL_V2 + "/tags/" + TAG_ID, undefined, HEADERS).reply(
            200,
            CREATE_TAG_RES
        );

        // Assertions
        await expect(tagsPromise).resolves.toEqual(CREATE_TAG_RES);
    });

    it("should update a tag", async () => {
        // Actual call
        const tagsPromise = client.tags.updateTag(TAG_ID, TAG);

        // Mock
        mock.onPut(BASE_URL_V2 + "/tags/" + TAG_ID, TAG, POST_HEADERS).reply(
            200,
            CREATE_TAG_RES
        );

        // Assertions
        await expect(tagsPromise).resolves.toEqual(CREATE_TAG_RES);
    });

    it("should delete a tag", async () => {
        // Actual call
        const tagsPromise = client.tags.deleteTag(TAG_ID);

        // Mock
        mock.onDelete(
            BASE_URL_V2 + "/tags/" + TAG_ID,
            undefined,
            HEADERS
        ).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });

    it("should return a list of hosts for a tag", async () => {
        // Actual call
        const tagsPromise = client.tags.listHostsForTag(TAG_ID);

        // Mock
        mock.onGet(
            BASE_URL_V2 + "/tags/" + TAG_ID + "/hosts",
            undefined,
            HEADERS
        ).reply(200, LIST_HOSTS_FOR_TAG_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(LIST_HOSTS_FOR_TAG_RES);
    });

    it("should return a list of certificates for a tag", async () => {
        // Actual call
        const tagsPromise = client.tags.listCertificatesForTag(TAG_ID);

        // Mock
        mock.onGet(
            BASE_URL_V2 + "/tags/" + TAG_ID + "/certificates",
            undefined,
            HEADERS
        ).reply(200, LIST_CERTS_FOR_TAG_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(LIST_CERTS_FOR_TAG_RES);
    });

    it("should return a list of tags on the given host", async () => {
        // Actual call
        const tagsPromise = client.tags.getTagsByHost(IP_ADDRESS);

        // Mock
        mock.onGet(
            BASE_URL_V2 + "/hosts/" + IP_ADDRESS + "/tags",
            undefined,
            HEADERS
        ).reply(200, GET_TAGS_BY_HOST_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(GET_TAGS_BY_HOST_RES);
    });

    //TODO: fix this test
    it("should add a tag on the given host", async () => {
        // Actual call
        const tagsPromise = client.tags.tagHost(IP_ADDRESS, TAG_ID);

        // Mock
        mock.onPut(
            BASE_URL_V2 + "/hosts/" + IP_ADDRESS + "/tags/" + TAG_ID
        ).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });

    it("should remove a tag on the given host", async () => {
        // Actual call
        const tagsPromise = client.tags.untagHost(IP_ADDRESS, TAG_ID);

        // Mock
        mock.onDelete(
            BASE_URL_V2 + "/hosts/" + IP_ADDRESS + "/tags/" + TAG_ID,
            undefined,
            HEADERS
        ).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });

    it("should return a list of tags on the given certificate", async () => {
        // Actual call
        const tagsPromise = client.tags.getTagsByCert(CERTIFICATE_SHA256);

        // Mock
        mock.onGet(
            BASE_URL_V2 + "/certificates/" + CERTIFICATE_SHA256 + "/tags",
            undefined,
            HEADERS
        ).reply(200, GET_TAGS_BY_CERT_RES);

        // Assertions
        await expect(tagsPromise).resolves.toEqual(GET_TAGS_BY_CERT_RES);
    });

    it("should add a tag on the given certificate", async () => {
        // Actual call
        const tagsPromise = client.tags.tagCert(CERTIFICATE_SHA256, TAG_ID);

        // Mock
        mock.onPut(
            BASE_URL_V2 +
                "/certificates/" +
                CERTIFICATE_SHA256 +
                "/tags/" +
                TAG_ID
        ).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });

    it("should remove a tag on the given certificate", async () => {
        // Actual call
        const tagsPromise = client.tags.untagCert(CERTIFICATE_SHA256, TAG_ID);

        // Mock
        mock.onDelete(
            BASE_URL_V2 +
                "/certificates/" +
                CERTIFICATE_SHA256 +
                "/tags/" +
                TAG_ID,
            undefined,
            HEADERS
        ).reply(204);

        // Assertions
        await expect(tagsPromise).resolves.not.toThrow();
    });
});
