import { CensysSearch } from "../src";

const client = new CensysSearch({
    API_ID: process.env.CENSYS_API_ID,
    API_SECRET: process.env.CENSYS_API_SECRET,
});

// View host events for a given IP address, including optional RFC3339 timestamp
client.experimental
    .viewHostEvents("8.8.8.8", "2022-06-27T20:55:05+00:00")
    .then(console.log)
    .catch(console.error);
