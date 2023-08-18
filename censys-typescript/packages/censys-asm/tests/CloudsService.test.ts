import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysASM } from "../src";
import { API_KEY, BASE_URL_V1, HEADERS } from "./utils";

//TODO: Increase test coverage

describe("CloudsService", () => {
    let mock: MockAdapter;
    let client: CensysASM;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysASM({ API_KEY });
    });

    afterEach(() => {
        mock.reset();
    });

    it("should get host counts by cloud", async () => {
        // Test data
        const since = "2020-01-01";
        const response = {
            totalAssetCount: 1,
            totalNewAssetCount: 1,
            totalCloudAssetCount: 1,
            totalCloudNewAssetCount: 1,
            assetCountByProvider: [
                {
                    cloudProvider: "cloudProvider",
                    assetCount: 1,
                    newAssetCount: 1,
                },
            ],
        };

        // Actual call
        const cloudsPromise = client.clouds.getV1CloudsHostCounts(since);

        // Mock
        mock.onGet(
            BASE_URL_V1 + `/clouds/hostCounts/${since}`,
            undefined,
            HEADERS
        ).reply(200, response);

        // Assertions
        await expect(cloudsPromise).resolves.toEqual(response);
    });
});
