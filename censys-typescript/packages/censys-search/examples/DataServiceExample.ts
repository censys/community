import { CensysSearch } from "../src";

const client = new CensysSearch({
    API_ID: process.env.CENSYS_API_ID,
    API_SECRET: process.env.CENSYS_API_SECRET,
});

// View data on the types of scans (series) we perform
client.data.getSeries().then(console.log).catch(console.error);

// View data about a specified scan
client.data
    .viewSeries("certificates-daily-added")
    .then(console.log)
    .catch(console.error);

// View data about a particular scan
client.data
    .viewResult("certificates-daily-added", "20220625")
    .then(console.log)
    .catch(console.error);
