import { CensysASM } from "../src";

const client = new CensysASM({
    API_KEY: process.env.CENSYS_API_KEY,
});

// Return a full list of all risks that affect any assets in the system.
client.risks.getV1Risks().then(console.log).catch(console.error);

// Return a full list of all risks from in the Arvixe cloud.
client.risks
    .getV1Risks(undefined, undefined, "Arvixe")
    .then(console.log)
    .catch(console.error);
