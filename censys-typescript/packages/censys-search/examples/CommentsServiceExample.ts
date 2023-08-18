import { CensysSearch } from "../src";

const client = new CensysSearch({
    API_ID: process.env.CENSYS_API_ID,
    API_SECRET: process.env.CENSYS_API_SECRET,
});

const IP = "8.8.8.8";

// View a list of comments on the given host
client.comments.getCommentsByHost(IP).then(console.log).catch(console.error);

// Add a comment on the given host
client.comments
    .addCommentByHost(IP, { contents: "This is a test comment" })
    .then(console.log)
    .catch(console.error);

// View a specific comment on the given host
client.comments
    .getCommentByHost(IP, "959")
    .then(console.log)
    .catch(console.error);

// Update a comment on the given host
client.comments
    .updateCommentByHost(IP, "959", { contents: "This is an updated comment" })
    .then(console.log)
    .catch(console.error);

// Delete a comment on the given host
client.comments
    .deleteCommentByHost(IP, "959")
    .then(console.log)
    .catch(console.error);
