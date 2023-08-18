import { CensysSearch } from "../src";

const client = new CensysSearch({
    API_ID: process.env.CENSYS_API_ID,
    API_SECRET: process.env.CENSYS_API_SECRET,
});

// View host metadata about what Censys scans for
client.metadata.getHostMetadata().then(console.log).catch(console.error);
