import type { Vector2 } from "broadutils/types";
import type { Layer } from "./layer.ts";
import type { PixelStack } from "./pixel-stack.ts";
export interface PixelStackData {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    dimensions: Vector2;
    layers: Layer[];
}
export interface LayerData extends StackObjectData {
    pixelStack: PixelStack;
}
export interface StackObjectData {
    dimensions: Vector2;
    position: Vector2;
    scale: Vector2;
    alpha: number;
    cachedImage: HTMLCanvasElement;
    cacheDirty: boolean;
}
//# sourceMappingURL=types.d.ts.map