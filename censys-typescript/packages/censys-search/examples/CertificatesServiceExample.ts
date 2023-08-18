import { CensysSearch } from "../src";

const client = new CensysSearch({
    API_ID: process.env.CENSYS_API_ID,
    API_SECRET: process.env.CENSYS_API_SECRET,
});

// View specified certificate
const fingerprint =
    "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7";
client.certificatesV1
    .viewCertificate(fingerprint)
    .then(console.log)
    .catch(console.error);

// Search certificate data set
const searchRequest = {
    query: " parsed.names: `censys.io` and parsed.issuer.organization: `Let's Encrypt`",
};
client.certificatesV1
    .searchCertificates(searchRequest)
    .then(console.log)
    .catch(console.error);

// View specific certificate report
const reportRequest = {
    query: "github.com and tags: trusted",
    field: "parsed.validity.start",
};
client.certificatesV1
    .generateCertificateReport(reportRequest)
    .then(console.log)
    .catch(console.error);

// Bulk certificate lookup example
const bulkRequest = {
    fingerprints: [
        "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7",
        "629ee76e44b336f06bfac826be9aae234b661f64a03c1988fe90b89fcb498bf8",
    ],
};
client.certificatesV1
    .bulkCertificateLookup(bulkRequest)
    .then(console.log)
    .catch(console.error);
