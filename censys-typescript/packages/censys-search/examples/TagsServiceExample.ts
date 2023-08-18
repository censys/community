import { CensysSearch } from "../src";

const client = new CensysSearch({
    API_ID: process.env.CENSYS_API_ID,
    API_SECRET: process.env.CENSYS_API_SECRET,
});

// View a list of all tags
client.tags.listTags().then(console.log).catch(console.error);

// Create a new tag
client.tags
    .createTag({
        id: "905",
        name: "newTag",
    })
    .then(console.log)
    .catch(console.error);

// View a tag
client.tags.getTag("2551").then(console.log).catch(console.error);

// Update a tag
client.tags
    .updateTag("2551", {
        name: "updatedTag",
    })
    .then(console.log)
    .catch(console.error);

// Delete a tag
client.tags.deleteTag("2551").then(console.log).catch(console.error);

// View a list of hosts for a tag
client.tags.listHostsForTag("2551").then(console.log).catch(console.error);

// List certificates for a tag
client.tags
    .listCertificatesForTag("2551")
    .then(console.log)
    .catch(console.error);

// List of tags on the given host (IP address)
client.tags.getTagsByHost("8.8.8.8").then(console.log).catch(console.error);

// Remove a tag from a host
client.tags.untagHost("8.8.8.8", "78").then(console.log).catch(console.error);

// Add a tag to a host
client.tags.tagHost("8.8.8.8", "78").then(console.log).catch(console.error);

// View a list of tags on a given certificate
client.tags
    .getTagsByCert(
        "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7"
    )
    .then(console.log)
    .catch(console.error);

// Add a tag to a certificate
client.tags
    .tagCert(
        "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7",
        "78"
    )
    .then(console.log)
    .catch(console.error);

// Remove a tag from a certificate
client.tags
    .untagCert(
        "125d206a9931a1f1a71e4c9a4ce66f2d3a99a64c00d040e7983a211e932ad2f7",
        "78"
    )
    .then(console.log)
    .catch(console.error);
