import { CensysASM } from "../src";

const client = new CensysASM({
    API_KEY: process.env.CENSYS_API_KEY,
});

// Returns a full list of all hosts within the system.
client.assets.getV1AssetsHosts().then(console.log).catch(console.error);

// Returns a full list of all domains within Censys ASM.
client.assets.getV1AssetsDomains().then(console.log).catch(console.error);

// Add a comment.
client.assets
    .postV1AssetsHostsComments("192.35.169.207", {
        markdown: "This is a comment",
    })
    .then(console.log)
    .catch(console.error);
