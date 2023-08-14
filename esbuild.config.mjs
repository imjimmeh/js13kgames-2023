import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/ecs-testing/testing.ts"],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: "./build/app.js",
});
