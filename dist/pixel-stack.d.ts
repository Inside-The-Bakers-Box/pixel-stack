import { Layer } from "./layer.ts";
import type { PixelStackData } from "./types.ts";
import type { Vector2 } from "broadutils";
export declare class PixelStack {
    static Layer: typeof Layer;
    protected data: PixelStackData;
    constructor();
    dimensions(value?: Vector2): Vector2;
    addLayer(layerId?: string): Layer;
    getLayer(layerId: string): Layer | null;
}
//# sourceMappingURL=pixel-stack.d.ts.map