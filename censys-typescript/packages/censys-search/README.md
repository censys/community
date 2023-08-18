# @censys/search

[![NPM Version](https://img.shields.io/npm/v/@censys/search)](https://www.npmjs.com/package/@censys/search)
[![License](https://img.shields.io/npm/l/@censys/search)](http://www.apache.org/licenses/LICENSE-2.0)

An easy-to-use and lightweight Typescript wrapper for Censys Search APIs.

## Installation

```sh
npm install --save @censys/search
yarn add @censys/search
```

## Examples

```typescript
import { CensysSearch } from '@censys/search';

const client = new CensysSearch({
    API_ID: process.env.CENSYS_API_ID,
    API_SECRET: process.env.CENSYS_API_SECRET,
});

// Fetch a specific host and its services
client.hosts.viewHost("1.1.1.1").then(console.log).catch(console.error);
```

## License

This software is licensed under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

- Copyright (C) 2023 Censys, Inc.
