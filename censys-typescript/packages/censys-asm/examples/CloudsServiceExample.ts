import { CensysASM } from "../src";

const client = new CensysASM({
    API_KEY: process.env.CENSYS_API_KEY,
});

// Retrieve host counts by cloud.
client.clouds
    .getV1CloudsHostCounts("2020-01-01")
    .then(console.log)
    .catch(console.error);

// Retrieve subdomain counts by cloud.
client.clouds
    .getV1CloudsSubdomainCounts("2022-01-01")
    .then(console.log)
    .catch(console.error);
