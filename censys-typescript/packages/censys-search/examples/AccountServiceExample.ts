import { CensysSearch } from "../src/CensysSearch";

const client = new CensysSearch({
    API_ID: process.env.CENSYS_API_ID,
    API_SECRET: process.env.CENSYS_API_SECRET,
});

// Output account info to console
client.account.account().then(console.log).catch(console.error);
