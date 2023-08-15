import * as esbuild from "esbuild";
import { copyFileSync } from "fs";

await esbuild.build({
  entryPoints: ["./src/ecs-testing/testing.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: "./build/game.js",
});

copyFileSync("src/index.html", "build/index.html");
