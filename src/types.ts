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
  id: string;

  dimensions: Vector2;
  position: Vector2;
  scale: Vector2;
  alpha: number;

  cachedImage: CanvasWithContext;
  cacheDirty: boolean;
}

export interface CanvasWithContext extends HTMLCanvasElement {
  context: CanvasRenderingContext2D;
}
