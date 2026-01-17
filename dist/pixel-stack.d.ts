import { StackLayer } from "./layer.ts";
import type { PixelStackData } from "./types.ts";
import type { Vector2 } from "broadutils";
export declare class PixelStack {
    protected data: PixelStackData;
    constructor();
    dimensions(value?: Vector2): Vector2;
    addLayer(layerId?: string): StackLayer;
    getLayer(layerId: string): StackLayer | null;
    getCanvas(): HTMLCanvasElement;
    render(): null;
}
//# sourceMappingURL=pixel-stack.d.ts.map