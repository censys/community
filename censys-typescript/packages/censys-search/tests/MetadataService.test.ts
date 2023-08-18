import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysSearch } from "../src";
import { BASE_URL_V2, CLIENT_CONFIG, HEADERS } from "./utils";

const API_RESPONSE = {
    code: 200,
    status: "ok",
    result: "test",
};
const GET_HOST_METADATA_RES = {
    ...API_RESPONSE,
    result: {
        services: ["test_service"],
    },
};

describe("MetadataService", () => {
    let mock: MockAdapter;
    let client: CensysSearch;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysSearch(CLIENT_CONFIG);
    });

    afterEach(() => {
        mock.reset();
    });

    it("should return host metadata about what Censys scans for", async () => {
        // Actual call
        const metadataPromise = client.metadata.getHostMetadata();
        // Mock
        mock.onGet(BASE_URL_V2 + "/metadata/hosts", undefined, HEADERS).reply(
            200,
            GET_HOST_METADATA_RES
        );

        // Assertions
        await expect(metadataPromise).resolves.toEqual(GET_HOST_METADATA_RES);
    });
});
