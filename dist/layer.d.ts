import { StackObject } from "./object.ts";
import type { StackLayerData, StackLayerInit } from "./types.ts";
export declare class StackLayer extends StackObject {
    protected data: StackLayerData;
    constructor(init: StackLayerInit);
    addObject(object: StackObject): boolean;
    removeObject(object: StackObject): boolean;
    render(): HTMLCanvasElement;
}
//# sourceMappingURL=layer.d.ts.map