import type { ApiResponse, HostComment, HostHit, VirtualHostHit } from "../src";
import { CensysSearch } from "../src";

const client = new CensysSearch({
    API_ID: process.env.CENSYS_API_ID,
    API_SECRET: process.env.CENSYS_API_SECRET,
});

const pagedSearchHosts = async (
    query: string,
    perPage = 100,
    virtualHosts: "EXCLUDE" | "INCLUDE" | "ONLY" = "EXCLUDE",
    pages = 1
): Promise<HostHit | VirtualHostHit[]> => {
    const hosts: Array<HostHit | VirtualHostHit> = [];
    let page = 1;
    let cursor = undefined;
    while (page <= pages) {
        const response: ApiResponse & {
            result?: {
                query: string;
                total: number;
                hits: Array<HostHit | VirtualHostHit>;
            };
            links?: {
                prev?: string;
                next?: string;
            };
        } = await client.hosts.searchHosts(
            query,
            perPage,
            virtualHosts,
            cursor
        );
        if (response.result) {
            hosts.push(...response.result.hits); // eslint-disable-line
            cursor = response.links?.next;
        }
        page++;
    }
    return hosts;
};

pagedSearchHosts("services.service_name: ELASTICSEARCH", 1, "EXCLUDE", 2)
    .then((hosts) => {
        console.log(hosts);
    })
    .catch((err) => {
        console.log(err);
    });

const aggregateHosts = async (
    field: string,
    query: string,
    numBuckets = 50,
    virtualHosts: "EXCLUDE" | "INCLUDE" | "ONLY" = "EXCLUDE"
): Promise<{ key: string; count: number }[]> => {
    const response: ApiResponse & {
        result?: {
            total?: number;
            total_omitted?: number;
            potential_deviation?: number;
            buckets: Array<{
                key?: string;
                count?: number;
            }>;
            query: string;
            field: string;
        };
    } = await client.hosts.aggregateHosts(
        field,
        query,
        numBuckets,
        virtualHosts
    );
    if (response.result) {
        return response.result.buckets; // eslint-disable-line
    }
    return [];
};

aggregateHosts("services.service_name", "ELASTICSEARCH", 50, "EXCLUDE")
    .then((result) => {
        console.log(result);
    })
    .catch((err) => {
        console.log(err);
    });

// Fetch a specific host and its services
client.hosts.viewHost("8.8.8.8").then(console.log).catch(console.error);

// Returns a diff of a host against different points in time or against a different host altogether.
client.hosts
    .viewHostDiff("8.8.8.8", "1.1.1.1")
    .then(console.log)
    .catch(console.error);

// Returns host events for the specified IP address, optionally pass in a RFC3339 timestamp to fetch a host at the given point in time.
client.hosts
    .viewHostEvents("8.8.8.8", "2021-03-01T17:49:05Z")
    .then(console.log)
    .catch(console.error);

// Returns host names for the specified IP address
client.hosts
    .viewHostNames("8.8.8.8", 100)
    .then(console.log)
    .catch(console.error);

// Returns a list of comments on the given host
client.hosts
    .getCommentsByHost("8.8.8.8")
    .then(console.log)
    .catch(console.error);

const getCommentId = async (ip: string): Promise<string> => {
    const response: ApiResponse & {
        result?: {
            ip?: string;
            comments?: Array<HostComment>;
        };
    } = await client.hosts.getCommentsByHost(ip);
    if (response.result) {
        return response.result.comments[0].id; // eslint-disable-line
    }
    return "";
};

getCommentId("8.8.8.8")
    .then((id) => {
        console.log(id);
    })
    .catch(console.error);

// Adds a comment on the given host
client.hosts
    .addCommentByHost("8.8.8.8", { contents: "This is a test comment" })
    .then(console.log)
    .catch(console.error);

// Returns a specific comment on the given host.
client.hosts
    .getCommentByHost("8.8.8.8", "69")
    .then(console.log)
    .catch(console.error);

// Updates a specific comment on the given host.
client.hosts
    .updateCommentByHost("8.8.8.8", "943", {
        contents: "This is an updated comment",
    })
    .then(console.log)
    .catch(console.error);

// Deletes a specific comment on the given host.
client.hosts
    .deleteCommentByHost("8.8.8.8", "943")
    .then(console.log)
    .catch(console.error);

// Returns host metadata about what Censys scans for
client.hosts.getHostMetadata().then(console.log).catch(console.error);

// Returns a list of hosts for a tag
client.hosts.listHostsForTag("69").then(console.log).catch(console.error);

// Returns a list of tags on the given host.
client.hosts.getTagsByHost("8.8.8.8").then(console.log).catch(console.error);

// Adds a tag on the given host.
client.hosts.tagHost("8.8.8.8", "943").then(console.log).catch(console.error);

// Removes a tag on the given host.
client.hosts.untagHost("8.8.8.8", "943").then(console.log).catch(console.error);
