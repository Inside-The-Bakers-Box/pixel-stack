/// <reference types="node" />

import { spawn } from "node:child_process";
import { buildWatch } from "./build-watch.js";

export const dev = async () => {
  const tsc = await buildWatch();
  const vite = spawn("node", ["./node_modules/vite/bin/vite.js"], {
    stdio: ["ignore", "inherit", "inherit"],
  });

  return { vite, tsc };
};

if (import.meta.main) dev();
