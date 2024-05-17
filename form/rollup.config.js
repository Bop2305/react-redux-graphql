import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import url from "@rollup/plugin-url";
import postcss from "rollup-plugin-postcss";
import copy from "rollup-plugin-copy";
// import { terser } from "rollup-plugin-terser";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      url({
        include: ["**/*.ttf"],
        limit: Infinity,
      }),
      peerDepsExternal(),
      resolve(),
      commonjs(),
      postcss({
        extract: true,
      }),
      copy({
        targets: [
          {
            src: "node_modules/remixicon/fonts/remixicon.eot",
            dest: "dist/cjs",
          },
          {
            src: "node_modules/remixicon/fonts/remixicon.svg",
            dest: "dist/cjs",
          },
          {
            src: "node_modules/remixicon/fonts/remixicon.ttf",
            dest: "dist/cjs",
          },
          {
            src: "node_modules/remixicon/fonts/remixicon.woff",
            dest: "dist/cjs",
          },
          {
            src: "node_modules/remixicon/fonts/remixicon.woff2",
            dest: "dist/cjs",
          },

          {
            src: "node_modules/remixicon/fonts/remixicon.eot",
            dest: "dist/esm",
          },
          {
            src: "node_modules/remixicon/fonts/remixicon.svg",
            dest: "dist/esm",
          },
          {
            src: "node_modules/remixicon/fonts/remixicon.ttf",
            dest: "dist/esm",
          },
          {
            src: "node_modules/remixicon/fonts/remixicon.woff",
            dest: "dist/esm",
          },
          {
            src: "node_modules/remixicon/fonts/remixicon.woff2",
            dest: "dist/esm",
          },
        ],
      }),
      typescript({ tsconfig: "./tsconfig.json" }),
      // terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "dist/esm/components/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
