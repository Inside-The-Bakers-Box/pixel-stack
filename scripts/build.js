/// <reference types="node" />

import { rm, mkdir } from "node:fs/promises";
import { spawn } from "node:child_process";

export const build = async (watch = false, incremental = false) => {
  await rm("./tsconfig.tsbuildinfo", { force: true });
  await rm("./dist/", { force: true, recursive: true });
  await mkdir("./dist/", { recursive: true });

  const spawnargs = ["tsc"];
  watch && spawnargs.push("--watch");
  incremental && spawnargs.push("--incremental");

  return spawn("npx", spawnargs, { stdio: ["ignore", "inherit", "inherit"] });
};

if (import.meta.main) build();
