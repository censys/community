import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { CensysASM } from "../src";
import { API_KEY, BASE_URL_V1, HEADERS } from "./utils";

// TODO: Increase test coverage

describe("RisksService", () => {
    let mock: MockAdapter;
    let client: CensysASM;

    beforeAll(() => {
        mock = new MockAdapter(axios);
        client = new CensysASM({ API_KEY });
    });

    afterEach(() => {
        mock.reset();
    });

    it("should get V1 risks", async () => {
        // Test data
        const pageNumber = 1;
        const cloud = "Arvixe";
        const includeAcceptedRisks = true;
        const response = {
            pageNumber: 1,
            pageSize: 10,
            totalPages: 1,
            totalItems: 20,
            environment: cloud,
            data: [
                {
                    riskinfoId: 3,
                    type: "type",
                    name: "name",
                    severity: "high",
                    isSeverityModified: true,
                    categories: ["categories"],
                    affectedAssetsCount: 1,
                    assetType: "HOST",
                },
            ],
        };

        // Actual call
        const risksPromise = client.risks.getV1Risks(
            pageNumber,
            undefined,
            cloud,
            undefined,
            includeAcceptedRisks
        );

        // Mock
        mock.onGet(
            BASE_URL_V1 +
                `/risks?pageNumber=${pageNumber}&cloud=${cloud}&includeAcceptedRisks=true`,
            undefined,
            HEADERS
        ).reply(200, response);

        // Assertions
        await expect(risksPromise).resolves.toEqual(response);
    });
});
