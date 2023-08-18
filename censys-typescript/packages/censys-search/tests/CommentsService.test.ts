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

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};
const GET_COMMENTS_BY_HOST_RES = {
    ...API_RESPONSE,
    result: {
        ip: IP_ADDRESS,
        comments: [
            {
                id: "test_id",
                ip: IP_ADDRESS,
                author_id: "test_author_id",
                contents: "test_contents",
                created_at: "01-01-2022",
            },
        ],
    },
};
const REQUEST_BODY = {
    contents: "test",
};
const ADD_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        id: "test_id",
        ip: IP_ADDRESS,
        author_id: "test_author_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const ADD_COMMENT_ERROR = {
    422: "Unprocessable Entity",
};
const GET_COMMENTS_BY_HOST_ERRORS = {
    404: `Not Found`,
    422: `Unprocessable Entity`,
};
const UPDATE_COMMENT_RES = {
    ...API_RESPONSE,
    result: {
        id: "test_id",
        ip: IP_ADDRESS,
        author_id: "test_author_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};
const GET_COMMENTS_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        fingerprint: CERTIFICATE_SHA256,
        comments: [
            {
                id: "test_id",
                fingerprint: CERTIFICATE_SHA256,
                author_id: "test_author_id",
                contents: "test_contents",
                created_at: "01-01-2022",
            },
        ],
    },
};

const ADD_COMMENT_BY_CERT_RES = {
    ...API_RESPONSE,
    result: {
        id: "test_id",
        fingerprint: CERTIFICATE_SHA256,
        author_id: "test_author_id",
        contents: "test_contents",
        created_at: "01-01-2022",
    },
};

describe("CommentsService", () => {
    let mock: MockAdapter;
    let client: CensysSearch;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysSearch(CLIENT_CONFIG);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should get comments by host", async () => {
        // Actual call
        const commentsPromise = client.comments.getCommentsByHost(IP_ADDRESS);

        // Mock
        const PATH = BASE_URL_V2 + `/hosts/${IP_ADDRESS}/comments`;
        mock.onGet(PATH, undefined, HEADERS).reply(
            200,
            GET_COMMENTS_BY_HOST_RES
        );

        // Assert
        await expect(commentsPromise).resolves.toEqual(
            GET_COMMENTS_BY_HOST_RES
        );
    });

    it("should add a comment on the given host", async () => {
        // Actual call
        const commentsPromise = client.comments.addCommentByHost(
            IP_ADDRESS,
            REQUEST_BODY
        );

        // Mock
        const PATH = BASE_URL_V2 + `/hosts/${IP_ADDRESS}/comments`;
        mock.onPost(PATH, REQUEST_BODY, POST_HEADERS).reply(
            200,
            ADD_COMMENT_RES
        );

        // Assert
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_RES);
    });

    it("addCommentByHost should throw an error if the request fails", async () => {
        // Actual call
        const commentsPromise = client.comments.addCommentByHost(
            IP_ADDRESS,
            REQUEST_BODY
        );

        // Mock
        const PATH = BASE_URL_V2 + `/hosts/${IP_ADDRESS}/comments`;
        mock.onPost(PATH, REQUEST_BODY, POST_HEADERS).reply(422);

        // Assert
        await expect(commentsPromise).rejects.toThrowError(
            ADD_COMMENT_ERROR[422]
        );
    });

    it("should return a specific comment on the given host", async () => {
        // Actual call
        const commentsPromise = client.comments.getCommentByHost(
            IP_ADDRESS,
            "test_id"
        );

        // Mock
        const PATH = BASE_URL_V2 + `/hosts/${IP_ADDRESS}/comments/test_id`;
        mock.onGet(PATH, undefined, HEADERS).reply(200, ADD_COMMENT_RES);

        // Assert
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_RES);
    });
    it.each([
        [404, GET_COMMENTS_BY_HOST_ERRORS[404]],
        [422, GET_COMMENTS_BY_HOST_ERRORS[422]],
    ])(
        "should throw an error if the request fails with status %i",
        async (status, errorMessage) => {
            // Actual call
            const commentsPromise = client.comments.getCommentByHost(
                IP_ADDRESS,
                "test_id"
            );
            const PATH = BASE_URL_V2 + `/hosts/${IP_ADDRESS}/comments/test_id`;

            // Mock
            mock.onGet(PATH, undefined, HEADERS).reply(status);

            // Assert
            await expect(commentsPromise).rejects.toThrowError(errorMessage);
        }
    );

    it("should update a specific comment on the given host", async () => {
        // Actual call
        const commentsPromise = client.comments.updateCommentByHost(
            IP_ADDRESS,
            "test_id",
            REQUEST_BODY
        );

        // Mock
        const PATH = BASE_URL_V2 + `/hosts/${IP_ADDRESS}/comments/test_id`;
        mock.onPut(PATH, REQUEST_BODY, POST_HEADERS).reply(
            200,
            UPDATE_COMMENT_RES
        );

        // Assert
        await expect(commentsPromise).resolves.toEqual(UPDATE_COMMENT_RES);
    });

    it.each([
        [404, GET_COMMENTS_BY_HOST_ERRORS[404]],
        [422, GET_COMMENTS_BY_HOST_ERRORS[422]],
    ])(
        "should throw an error if the request fails with status %i",
        async (status, errorMessage) => {
            // Actual call
            const commentsPromise = client.comments.updateCommentByHost(
                IP_ADDRESS,
                "test_id",
                REQUEST_BODY
            );
            const PATH = BASE_URL_V2 + `/hosts/${IP_ADDRESS}/comments/test_id`;

            // Mock
            mock.onPut(PATH, undefined, {
                ...HEADERS,
                "Content-Type": "application/json",
            }).reply(status);

            // Assert
            await expect(commentsPromise).rejects.toThrowError(errorMessage);
        }
    );

    it("should delete a specific comment on the given host", async () => {
        // Actual call
        const commentsPromise = client.comments.deleteCommentByHost(
            IP_ADDRESS,
            "test_id"
        );

        // Mock
        const PATH = BASE_URL_V2 + `/hosts/${IP_ADDRESS}/comments/test_id`;
        mock.onDelete(PATH, undefined, HEADERS).reply(200);

        // Assert
        await expect(commentsPromise).resolves.toEqual(undefined);
    });

    it.each([
        [404, GET_COMMENTS_BY_HOST_ERRORS[404]],
        [422, GET_COMMENTS_BY_HOST_ERRORS[422]],
    ])(
        "should throw an error if the request fails with status %i",
        async (status, errorMessage) => {
            // Actual call
            const commentsPromise = client.comments.deleteCommentByHost(
                IP_ADDRESS,
                "test_id"
            );
            const PATH = BASE_URL_V2 + `/hosts/${IP_ADDRESS}/comments/test_id`;

            // Mock
            mock.onDelete(PATH, undefined, HEADERS).reply(status);

            // Assert
            await expect(commentsPromise).rejects.toThrowError(errorMessage);
        }
    );

    it("should return a list of comments on the given cert", async () => {
        // Actual call
        const commentsPromise =
            client.comments.getCommentsByCert(CERTIFICATE_SHA256);

        // Mock
        const PATH =
            BASE_URL_V2 + `/certificates/${CERTIFICATE_SHA256}/comments`;
        mock.onGet(PATH, undefined, HEADERS).reply(
            200,
            GET_COMMENTS_BY_CERT_RES
        );

        // Assertions
        await expect(commentsPromise).resolves.toEqual(
            GET_COMMENTS_BY_CERT_RES
        );
    });

    it("should add a comment on the given certificate", async () => {
        // Actual call
        const commentsPromise = client.comments.addCommentByCert(
            CERTIFICATE_SHA256,
            REQUEST_BODY
        );

        // Mock
        const PATH =
            BASE_URL_V2 + `/certificates/${CERTIFICATE_SHA256}/comments`;
        mock.onPost(PATH, REQUEST_BODY, POST_HEADERS).reply(
            200,
            ADD_COMMENT_BY_CERT_RES
        );

        // Assertions
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_BY_CERT_RES);
    });

    it("should return a comment on the given certificate", async () => {
        // Actual call
        const commentsPromise = client.comments.getCommentByCert(
            CERTIFICATE_SHA256,
            "test_id"
        );

        // Mock
        const PATH =
            BASE_URL_V2 +
            `/certificates/${CERTIFICATE_SHA256}/comments/test_id`;
        mock.onGet(PATH, undefined, HEADERS).reply(
            200,
            ADD_COMMENT_BY_CERT_RES
        );

        // Assert
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_BY_CERT_RES);
    });

    it("should update a comment on the given certificate", async () => {
        // Actual call
        const commentsPromise = client.comments.updateCommentByCert(
            CERTIFICATE_SHA256,
            "test_id",
            REQUEST_BODY
        );

        // Mock
        const PATH =
            BASE_URL_V2 +
            `/certificates/${CERTIFICATE_SHA256}/comments/test_id`;
        mock.onPut(PATH, REQUEST_BODY, POST_HEADERS).reply(
            200,
            ADD_COMMENT_BY_CERT_RES
        );

        // Assert
        await expect(commentsPromise).resolves.toEqual(ADD_COMMENT_BY_CERT_RES);
    });

    it("should throw a 404 error", async () => {
        // Actual call
        const commentsPromise = client.comments.updateCommentByCert(
            CERTIFICATE_SHA256,
            "test_id",
            REQUEST_BODY
        );

        // Mock
        const PATH =
            BASE_URL_V2 +
            `/certificates/${CERTIFICATE_SHA256}/comments/test_id`;
        mock.onPut(PATH, REQUEST_BODY, POST_HEADERS).reply(404);

        // Assert
        await expect(commentsPromise).rejects.toThrowError("Not Found");
    });

    it("should delete a comment on the given certificate", async () => {
        // Actual call
        const commentsPromise = client.comments.deleteCommentByCert(
            CERTIFICATE_SHA256,
            "test_id"
        );

        // Mock
        const PATH =
            BASE_URL_V2 +
            `/certificates/${CERTIFICATE_SHA256}/comments/test_id`;
        mock.onDelete(PATH, REQUEST_BODY, HEADERS).reply(
            200,
            GET_COMMENTS_BY_CERT_RES
        );

        // Assert
        await expect(commentsPromise).resolves.toEqual(
            GET_COMMENTS_BY_CERT_RES
        );
    });

    it("deleteCommentByCert should throw a 404 error", async () => {
        // Actual call
        const commentsPromise = client.comments.deleteCommentByCert(
            CERTIFICATE_SHA256,
            "test_id"
        );

        // Mock
        const PATH =
            BASE_URL_V2 +
            `/certificates/${CERTIFICATE_SHA256}/comments/test_id`;
        mock.onPut(PATH, REQUEST_BODY, HEADERS).reply(404);

        // Assert
        await expect(commentsPromise).rejects.toThrowError("Not Found");
    });
});
