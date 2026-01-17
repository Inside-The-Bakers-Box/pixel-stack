import { PixelStack } from "../../dist/pixel-stack.js";
import { StackImage } from "../../dist/image.js";

const main = document.querySelector("main");
if (!main) throw new TypeError("value is nullish");

const imageSource = document.createElement("img");
// Photo by Oskar Gross: https://www.pexels.com/photo/stunning-mountain-range-under-clear-blue-sky-34314127/
imageSource.src = "/web/assets/pexels-oskar-gross-1074333632-34314127.jpg";
await imageSource.decode();

const stack = new PixelStack();
const layer = stack.getLayer("root");
const image = new StackImage({ imageSource, imageFillMode: "contain" });

image.dimensions([360, 180]);
image.imagePosition([0.5, 0.5]);
image.dimensionsMode("relative");

layer.addObject(image);
stack.render();

main.appendChild(stack.getCanvas());
main.appendChild(imageSource);
