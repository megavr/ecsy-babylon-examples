import resolve from "rollup-plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const libPlugins = [
  resolve({ browser: true }),
  terser({
    compress: {
      drop_console: true
    },
    // keep_classnams on ecsy 0.1.4 for https://github.com/MozillaReality/ecsy/issues/124
    mangle: {
      keep_classnames: true
    },
    module: true
  })
]

const appExternal = [
  "ecsy",
  "@megavr/ecsy-babylon",
]

const appPlugins = [
  terser({
    compress: {
      drop_console: true
    },
    module: true
  })
]

const appModulePaths = {
  "ecsy": "https://ecsy.io/build/ecsy.module.js",
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
    ],
    input: "./packages/js-libs/babylon.module.js",
    plugins: libPlugins,
    output: {
      file: "./docs/js-libs/babylon.module.js",
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
        "ecsy": "https://ecsy.io/build/ecsy.module.js",
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
  // docs/js/app.material.module.js
  {
    external: appExternal,
    input: "./packages/app.material.js",
    plugins: appPlugins,
    output: {
      file: "./docs/js/app.material.module.js",
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
])