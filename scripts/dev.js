/// <reference types="node" />

import { spawn } from "node:child_process";
import { buildWatch } from "./build-watch.js";

export const dev = async () => {
  const tsc = await buildWatch();
  const cafe = spawn("npx", ["cafe"], {
    stdio: ["ignore", "inherit", "inherit"],
  });

  return { cafe, tsc };
};

if (import.meta.main) dev();
