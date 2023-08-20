import * as esbuild from "esbuild";
import { copyFileSync } from "fs";

await esbuild.build({
  entryPoints: ["./src/app.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: "./build/g.js",
});

copyFileSync("src/index.html", "build/index.html");
