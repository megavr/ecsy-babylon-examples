import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import json from "@rollup/plugin-json";

const libPlugins = [
  resolve({ browser: true }),
  terser({
    compress: { drop_console: true },
    // on ecsy 0.2.1 for https://github.com/MozillaReality/ecsy/issues/129
    mangle: { keep_classnames: true },
    module: true
  }),
  // required for compile ecsy.module.js
  json()
]

const appExternal = [
  "ecsy",
  "@megavr/ecsy-babylon",
]

const appPlugins = [
  terser({
    compress: { drop_console: true },
    module: true
  })
]

const appModulePaths = {
  "ecsy": "../js-libs/ecsy.module.js",
  "@megavr/ecsy-babylon": "../js-libs/ecsy-babylon.module.js",
}

export default [
  // docs/js-libs/ecsy-babylon.js
  {
    external: [
      "ecsy",
      "@babylonjs/core",
    ],
    input: "./packages/js-libs/ecsy-babylon.js",
    plugins: libPlugins,
    output: {
      file: "./docs/js-libs/ecsy-babylon.js",
      format: "iife",
      name: "app",
      globals: {
        "ecsy": "ECSY",
        "@babylonjs/core": "BABYLON",
      },
    },
  },
  // docs/js-libs/babylon.module.js
  {
    external: [
      "@babylonjs/core",
      "@babylonjs/loaders"
    ],
    input: "./packages/js-libs/babylon.module.js",
    plugins: libPlugins,
    output: {
      file: "./docs/js-libs/babylon.module.js",
      format: "esm",
    },
  },
  // docs/js-libs/ecsy.module.js
  {
    external: [
      "ecsy",
    ],
    input: "./packages/js-libs/ecsy.module.js",
    plugins: libPlugins,
    output: {
      file: "./docs/js-libs/ecsy.module.js",
      format: "esm",
    },
  },
  // docs/js-libs/ecsy-babylon.module.js
  {
    external: [
      "ecsy",
      "@babylonjs/core",
    ],
    input: "./packages/js-libs/ecsy-babylon.module.js",
    plugins: libPlugins,
    output: {
      file: "./docs/js-libs/ecsy-babylon.module.js",
      format: "esm",
      paths: {
        "ecsy": "./ecsy.module.js",
        "@babylonjs/core": "./babylon.module.js",
      },
    },
  },
].concat([
  // docs/js/app.js
  {
    external: appExternal,
    input: "./packages/app.js",
    plugins: appPlugins,
    output: {
      file: "./docs/js/app.js",
      format: "iife",
      name: "app",
      globals: {
        "ecsy": "ECSY",
        "@megavr/ecsy-babylon": "EB",
      },
    },
  },
  // docs/js/app.module.js
  {
    external: appExternal,
    input: "./packages/app.js",
    plugins: appPlugins,
    output: {
      file: "./docs/js/app.module.js",
      format: "esm",
      paths: appModulePaths,
    },
  },
  // docs/js/app.asset.js
  {
    external: appExternal,
    input: "./packages/app.asset.js",
    plugins: appPlugins,
    output: {
      file: "./docs/js/app.asset.js",
      format: "iife",
      name: "app",
      globals: {
        "ecsy": "ECSY",
        "@megavr/ecsy-babylon": "EB",
      },
    },
  },
  // docs/js/app.asset.module.js
  {
    external: appExternal,
    input: "./packages/app.asset.js",
    plugins: appPlugins,
    output: {
      file: "./docs/js/app.asset.module.js",
      format: "esm",
      paths: appModulePaths,
    },
  },
  // docs/js/app.particle.module.js
  {
    external: appExternal,
    input: "./packages/app.particle.js",
    plugins: appPlugins,
    output: {
      file: "./docs/js/app.particle.module.js",
      format: "esm",
      paths: appModulePaths,
    },
  },
  // docs/js/app.keyinput.module.js
  {
    external: appExternal,
    input: "./packages/app.keyinput.js",
    plugins: appPlugins,
    output: {
      file: "./docs/js/app.keyinput.module.js",
      format: "esm",
      paths: appModulePaths,
    },
  },
])