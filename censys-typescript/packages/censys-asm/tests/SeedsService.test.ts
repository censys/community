import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysASM } from "../src";
import { API_KEY, BASE_URL_V1, IP_ADDRESS, POST_HEADERS } from "./utils";

// TODO: Increase test coverage

describe("SeedsService", () => {
    let mock: MockAdapter;
    let client: CensysASM;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysASM({ API_KEY });
    });

    afterEach(() => {
        mock.reset();
    });

    it("should put V1 seeds", async () => {
        // Test data
        const label = "label";
        const seed_data: {
            seeds: Array<{
                type: "ASN" | "CIDR" | "DOMAIN_NAME" | "IP_ADDRESS";
                value: string | number;
            }>;
        } = {
            seeds: [
                {
                    type: "IP_ADDRESS",
                    value: IP_ADDRESS,
                },
            ],
        };

        // Actual call
        const seedsPromise = client.seeds.putV1Seeds(label, seed_data);

        // Mock
        mock.onPut(
            BASE_URL_V1 + `/seeds?label=${label}`,
            seed_data,
            POST_HEADERS
        ).reply(200, {});

        // Assertions
        await expect(seedsPromise).resolves.toEqual({});
    });
});
