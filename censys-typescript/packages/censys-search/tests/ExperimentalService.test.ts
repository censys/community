import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysSearch } from "../src";
import { BASE_URL_V2, CLIENT_CONFIG, HEADERS, IP_ADDRESS } from "./utils";

const START_TIME = "01-01-2022";
const END_TIME = "01-01-2022";
const PER_PAGE = 25;
const CURSOR = "test_cursor";
const REVERSED = true;

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};

const HOST_EVENTS_PATH =
    BASE_URL_V2 + `/experimental/hosts/${IP_ADDRESS}/events`;

const VIEW_HOST_EVENTS_RES = {
    ...API_RESPONSE,
    result: {
        ip: IP_ADDRESS,
        events: [{ _event: "test_event", timestamp: "01-01-2022" }],
    },
};

const VIEW_HOST_EVENTS_ERRORS = {
    401: `You must authenticate with a valid API ID and secret.`,
    422: `Invalid IP address.`,
};

describe("ExperimentalService", () => {
    let mock: MockAdapter;
    let client: CensysSearch;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysSearch(CLIENT_CONFIG);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return host events for the specified IP address", async () => {
        // Actual call
        const experimentalPromise = client.experimental.viewHostEvents(
            IP_ADDRESS,
            START_TIME,
            END_TIME,
            PER_PAGE,
            CURSOR,
            REVERSED
        );
        // Mock
        mock.onGet(
            HOST_EVENTS_PATH +
                "?start_time=" +
                START_TIME +
                "&end_time=" +
                END_TIME +
                "&per_page=" +
                `${PER_PAGE}` +
                "&cursor=" +
                CURSOR +
                "&reversed=" +
                `true`,
            undefined,
            HEADERS
        ).reply(200, VIEW_HOST_EVENTS_RES);

        // Assert
        await expect(experimentalPromise).resolves.toEqual(
            VIEW_HOST_EVENTS_RES
        );
    });

    it.each([
        [401, VIEW_HOST_EVENTS_ERRORS[401]],
        [422, VIEW_HOST_EVENTS_ERRORS[422]],
    ])("viewHostEvents should throw errors", async (status, errorMessage) => {
        // Actual call
        const experimentalPromise = client.experimental.viewHostEvents(
            IP_ADDRESS,
            START_TIME,
            END_TIME,
            PER_PAGE,
            CURSOR,
            REVERSED
        );
        // Mock
        mock.onGet(
            HOST_EVENTS_PATH +
                "?start_time=" +
                START_TIME +
                "&end_time=" +
                END_TIME +
                "&per_page=" +
                `${PER_PAGE}` +
                "&cursor=" +
                CURSOR +
                "&reversed=" +
                `true`,
            undefined,
            HEADERS
        ).reply(status);

        // Assert
        await expect(experimentalPromise).rejects.toThrowError(errorMessage);
    });
});
