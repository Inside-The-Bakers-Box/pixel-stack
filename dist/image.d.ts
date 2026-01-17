import { StackObject } from "./object.ts";
import type { StackImageData, StackImageInit } from "./types.ts";
import type { Vector2 } from "broadutils/types";
export declare class StackImage extends StackObject {
    data: StackImageData;
    constructor(init: StackImageInit);
    imageSource(value?: StackImageData["imageSource"]): StackImageData["imageSource"];
    imageFillMode(value?: StackImageData["imageFillMode"]): StackImageData["imageFillMode"];
    imagePosition(value?: Vector2): Vector2;
    imageDimensions(value?: Vector2): Vector2;
    dimensionsMode(value?: StackImageData["dimensionsMode"]): StackImageData["dimensionsMode"];
    render(): HTMLCanvasElement;
}
//# sourceMappingURL=image.d.ts.map