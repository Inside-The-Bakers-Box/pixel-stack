import { StackObject } from "./object.ts";
import type { PixelStack } from "./pixel-stack.ts";
import type { LayerData } from "./types.ts";
export declare class Layer extends StackObject {
    protected data: LayerData;
    constructor(id: string | null, pixelStack: PixelStack);
}
//# sourceMappingURL=layer.d.ts.map