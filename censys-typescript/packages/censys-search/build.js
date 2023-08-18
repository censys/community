const { build } = require("esbuild");
const { Generator } = require("npm-dts");
const { dependencies, devDependencies } = require("./package.json");

const shared = {
    entryPoints: ["src/index.ts"],
    bundle: true,
    minify: true,
    external: Object.keys(dependencies).concat(Object.keys(devDependencies)),
};

build({
    ...shared,
    outfile: "dist/index.js",
});

build({
    ...shared,
    outfile: "dist/index.esm.js",
    format: "esm",
});

new Generator({
    entry: "src/index.ts",
    output: "dist/index.d.ts",
}).generate();
