import { CensysASM } from "../src";

const client = new CensysASM({
    API_KEY: process.env.CENSYS_API_KEY,
});

// Get logbook entries
client.logbook.getV1Logbook().then(console.log).catch(console.error);
