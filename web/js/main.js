import { PixelStack } from "../../src/pixel-stack.ts";

const stack = new PixelStack();
const layer = stack.getLayer("root");

console.log({ stack, layer });
console.log("Hello from PixelStack...");
