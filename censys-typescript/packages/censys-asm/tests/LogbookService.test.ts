import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysASM } from "../src";
import { API_KEY, BASE_URL_V1, POST_HEADERS } from "./utils";

// TODO: Increase test coverage

describe("LogbookService", () => {
    let mock: MockAdapter;
    let client: CensysASM;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysASM({ API_KEY });
    });

    afterEach(() => {
        mock.reset();
    });

    it("should post logbook cursor", async () => {
        // Test data
        const requestBody = {
            dateFrom: "2020-01-01",
        };

        // Actual call
        const logbookPromise = client.logbook.postV1LogbookCursor(requestBody);

        // Mock
        mock.onPost(
            BASE_URL_V1 + "/logbook-cursor",
            undefined,
            POST_HEADERS
        ).reply(200, {
            cursor: "cursor",
        });

        // Assertions
        await expect(logbookPromise).resolves.toEqual({
            cursor: "cursor",
        });
    });
});
