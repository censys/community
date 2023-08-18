import { CensysASM } from "../src";

const client = new CensysASM({
    API_KEY: process.env.CENSYS_API_KEY,
});

// Return a full list of all seed data you've added to the system.
client.seeds.getV1Seeds().then(console.log).catch(console.error);

// Add a new seed.
client.seeds
    .postV1Seeds({
        seeds: [
            {
                label: "seed-label",
                type: "IP_ADDRESS",
                value: "3.3.3.3",
            },
        ],
    })
    .then(console.log)
    .catch(console.error);

// Update seeds by label.
client.seeds
    .putV1Seeds("seed-label", {
        seeds: [
            {
                type: "IP_ADDRESS",
                value: "1.1.1.1",
            },
        ],
    })
    .then(console.log)
    .catch(console.error);
