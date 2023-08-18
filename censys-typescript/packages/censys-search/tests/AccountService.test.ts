import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysSearch } from "../src";
import { BASE_URL_V1, CLIENT_CONFIG, HEADERS } from "./utils";

const DATE = "2022-01-01";
const ACCOUNT_RES = {
    email: "test@example.com",
    login: "test",
    first_login: DATE,
    last_login: DATE,
    quota: {
        used: 0,
        resets_at: DATE,
        allowance: 100,
    },
};
const ERRORS = {
    403: `Your request did not include a valid Authorization header.`,
    429: `Your query was not executed because you have exceeded your specified rate limit.`,
    500: "An unexpected error occurred when trying to execute your query. Try again at a later time or contact us at [support@censys.io](mailto:support@censys.io) if the problem persists.",
};

const ACCOUNT_PATH = BASE_URL_V1 + "/account";

describe("AccountService", () => {
    let mock: MockAdapter;
    let client: CensysSearch;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysSearch(CLIENT_CONFIG);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should fetch account details", async () => {
        // Actual call
        const accountPromise = client.account.account();

        // Mock
        mock.onGet(ACCOUNT_PATH, undefined, HEADERS).reply(200, ACCOUNT_RES);

        // Assertions
        await expect(accountPromise).resolves.toEqual(ACCOUNT_RES);
    });

    it("should throw a 403 error", async () => {
        // Actual call
        const accountPromise = client.account.account();

        // Mock
        mock.onGet(ACCOUNT_PATH, undefined, HEADERS).reply(403);

        // Assertions
        await expect(accountPromise).rejects.toThrowError(
            new Error(ERRORS[403])
        );
    });

    it("should throw a 429 error", async () => {
        // Actual call
        const accountPromise = client.account.account();

        // Mock
        mock.onGet(ACCOUNT_PATH, undefined, HEADERS).reply(429);

        // Assertions
        await expect(accountPromise).rejects.toThrowError(
            new Error(ERRORS[429])
        );
    });

    it("should throw a 500 error", async () => {
        // Actual call
        const accountPromise = client.account.account();

        // Mock
        mock.onGet(ACCOUNT_PATH, undefined, HEADERS).reply(500);

        // Assertions
        await expect(accountPromise).rejects.toThrowError(
            new Error(ERRORS[500])
        );
    });
});
