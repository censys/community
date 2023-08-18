import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysSearch } from "../src";
import {
    BASE_URL_V2,
    CERTIFICATE_SHA256,
    CLIENT_CONFIG,
    DOMAIN_NAME,
    HEADERS,
    IP_ADDRESS,
    POST_HEADERS,
} from "./utils";

const CERTS_PATH = BASE_URL_V2 + "/certificates/";

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};
const CERTS_REQUEST = {
    contents: "test",
};
const GET_HOSTS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: CERTIFICATE_SHA256,
        hosts: [
            {
                ip: IP_ADDRESS,
                name: DOMAIN_NAME,
                observed_at: "01-01-2022",
                first_observed_at: "01-01-2022",
            },
        ],
        links: {
            next: "next",
        },
    },
};
const GET_COMMENTS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: CERTIFICATE_SHA256,
        comments: [
            {
                id: "string",
                fingerprint: CERTIFICATE_SHA256,
                author_id: "test_id",
                contents: "test_contents",
                created_at: "01-01-2022",
            },
        ],
    },
};
const ADD_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        id: "string",
        fingerprint: CERTIFICATE_SHA256,
        author_id: "test_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const GET_COMMENT_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        id: "string",
        fingerprint: CERTIFICATE_SHA256,
        author_id: "test_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const UPDATE_COMMENT_REQUEST = {
    contents: "test",
};
const UPDATE_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        id: "string",
        fingerprint: CERTIFICATE_SHA256,
        author_id: "test_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const DELETE_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: CERTIFICATE_SHA256,
        comments: [
            {
                id: "string",
                fingerprint: CERTIFICATE_SHA256,
                author_id: "test_id",
                contents: "test_contents",
                created_at: "01-01-2022",
            },
        ],
    },
};
const LIST_CERTIFICATES_RES = {
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
const GET_TAGS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: CERTIFICATE_SHA256,
        tags: [
            {
                id: "test_id",
                name: "test_name",
                metadata: {
                    color: "test_color",
                },
                created_at: "01-01-2022",
                updated_at: "01-01-2022",
            },
        ],
    },
};

describe("CertsService", () => {
    let mock: MockAdapter;
    let client: CensysSearch;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysSearch(CLIENT_CONFIG);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return a list of hosts presenting the given certificate and which contain services presenting this certificate", async () => {
        // Test data
        const cursor = "test_cursor";

        // Actual call
        const certsPromise = client.certificatesV2.getHostsByCert(
            CERTIFICATE_SHA256,
            cursor
        );

        // Mock
        mock.onGet(
            CERTS_PATH + CERTIFICATE_SHA256 + `/hosts?cursor=${cursor}`,
            undefined,
            HEADERS
        ).reply(200, GET_HOSTS_BY_CERT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(GET_HOSTS_BY_CERT_RES);
    });

    it("Returns a list of comments on the given certificate.", async () => {
        // Actual call
        const certsPromise =
            client.certificatesV2.getCommentsByCert(CERTIFICATE_SHA256);

        // Mock
        mock.onGet(
            CERTS_PATH + CERTIFICATE_SHA256 + "/comments",
            undefined,
            HEADERS
        ).reply(200, GET_COMMENTS_BY_CERT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(GET_COMMENTS_BY_CERT_RES);
    });

    it("should add a comment on the given certificate.", async () => {
        // Actual call
        const certsPromise = client.certificatesV2.addCommentByCert(
            CERTIFICATE_SHA256,
            CERTS_REQUEST
        );

        // Mock
        mock.onPost(
            CERTS_PATH + CERTIFICATE_SHA256 + "/comments",
            CERTS_REQUEST,
            POST_HEADERS
        ).reply(200, ADD_COMMENT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(ADD_COMMENT_RES);
    });

    it("should return a comment on the given certificate.", async () => {
        // Actual call
        const certsPromise = client.certificatesV2.getCommentByCert(
            CERTIFICATE_SHA256,
            "test_id"
        );

        // Mock
        mock.onGet(
            CERTS_PATH + CERTIFICATE_SHA256 + "/comments/test_id",
            undefined,
            HEADERS
        ).reply(200, GET_COMMENT_BY_CERT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(GET_COMMENT_BY_CERT_RES);
    });

    it("should update a comment on the given certificate.", async () => {
        // Actual call
        const certsPromise = client.certificatesV2.updateCommentByCert(
            CERTIFICATE_SHA256,
            "test_id",
            UPDATE_COMMENT_REQUEST
        );

        // Mock
        mock.onPut(
            CERTS_PATH + CERTIFICATE_SHA256 + "/comments/test_id",
            UPDATE_COMMENT_REQUEST,
            POST_HEADERS
        ).reply(200, UPDATE_COMMENT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(UPDATE_COMMENT_RES);
    });

    it("should throw an error", async () => {
        // Actual call
        const certsPromise = client.certificatesV2.updateCommentByCert(
            CERTIFICATE_SHA256,
            "test_id",
            UPDATE_COMMENT_REQUEST
        );

        // Mock
        mock.onPut(
            CERTS_PATH + CERTIFICATE_SHA256 + "/comments/test_id",
            UPDATE_COMMENT_REQUEST,
            POST_HEADERS
        ).reply(404, DELETE_COMMENT_RES);

        // Assertions
        await expect(certsPromise).rejects.toThrowError("Not Found");
    });

    it("should delete a comment on the given certificate.", async () => {
        // Actual call
        const certsPromise = client.certificatesV2.deleteCommentByCert(
            CERTIFICATE_SHA256,
            "test_id"
        );

        // Mock
        mock.onDelete(
            CERTS_PATH + CERTIFICATE_SHA256 + "/comments/test_id",
            HEADERS
        ).reply(200, DELETE_COMMENT_RES);

        // Assertions
        await expect(certsPromise).resolves.toEqual(DELETE_COMMENT_RES);
    });

    it("delete comment should throw an error", async () => {
        // Actual call
        const certsPromise = client.certificatesV2.deleteCommentByCert(
            CERTIFICATE_SHA256,
            "test_id"
        );

        // Mock
        mock.onDelete(
            CERTS_PATH + CERTIFICATE_SHA256 + "/comments/test_id",
            HEADERS
        ).reply(404, DELETE_COMMENT_RES);

        // Assertions
        await expect(certsPromise).rejects.toThrowError("Not Found");
    });

    it("should return a list of certificates for a tag", async () => {
        // Actual call
        const certsPromise =
            client.certificatesV2.listCertificatesForTag("test_tag");

        // Mock
        mock.onGet(BASE_URL_V2 + "/tags/test_tag/certificates", HEADERS).reply(
            200,
            LIST_CERTIFICATES_RES
        );

        // Assertions
        await expect(certsPromise).resolves.toEqual(LIST_CERTIFICATES_RES);
    });

    it("should return a list of tags on the given certificate.", async () => {
        // Actual call
        const certsPromise =
            client.certificatesV2.getTagsByCert(CERTIFICATE_SHA256);

        // Mock
        mock.onGet(CERTS_PATH + CERTIFICATE_SHA256 + "/tags", HEADERS).reply(
            200,
            GET_TAGS_BY_CERT_RES
        );

        // Assertions
        await expect(certsPromise).resolves.toEqual(GET_TAGS_BY_CERT_RES);
    });
    it("should add a tag on the given certificate.", async () => {
        // Actual call
        const certsPromise = client.certificatesV2.tagCert(
            CERTIFICATE_SHA256,
            "tag_id"
        );

        // Mock
        mock.onPut(CERTS_PATH + CERTIFICATE_SHA256 + "/tags/tag_id").reply(200);

        // Assertions
        await expect(certsPromise).resolves.toEqual(undefined);
    });

    it("should remove a tag on the given certificate.", async () => {
        // Actual call
        const certsPromise = client.certificatesV2.untagCert(
            CERTIFICATE_SHA256,
            "tag_id"
        );

        // Mock
        mock.onDelete(CERTS_PATH + CERTIFICATE_SHA256 + "/tags/tag_id").reply(
            200
        );

        // Assertions
        await expect(certsPromise).resolves.toEqual(undefined);
    });
});
