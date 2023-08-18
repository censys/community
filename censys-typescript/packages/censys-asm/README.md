# @censys/asm

![NPM Version](https://img.shields.io/npm/v/@censys/asm)
![License](https://img.shields.io/npm/l/@censys/asm)

An easy-to-use and lightweight Typescript wrapper for Censys ASM APIs.

## Installation

```sh
npm install --save @censys/asm
yarn add @censys/asm
```

## Examples

```typescript
import { CensysASM } from '@censys/search';

const client = new CensysASM({
    API_KEY: process.env.CENSYS_API_KEY,
});

// Returns a full list of all domains within Censys ASM.
client.assets.getV1AssetsDomains().then(console.log).catch(console.error);
```

## License

This software is licensed under [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)

- Copyright (C) 2023 Censys, Inc.
