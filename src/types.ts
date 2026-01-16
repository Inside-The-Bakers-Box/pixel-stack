import type { Vector2 } from "broadutils/types";
import type { StackLayer } from "./layer.ts";
import type { PixelStack } from "./pixel-stack.ts";
import type { StackObject } from "./object.ts";

export interface CanvasWithContext extends HTMLCanvasElement {
  context: CanvasRenderingContext2D;
}

export interface PixelStackData {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  dimensions: Vector2;
  layers: StackLayer[];
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

export interface StackLayerData extends StackObjectData {
  objects: Set<StackObject>;
  pixelStack: PixelStack;
}

export interface StackImageData extends StackObjectData {
  imageSource: HTMLImageElement;
  imageFillMode: "cover" | "contain" | "direct";
  imagePosition: Vector2;
}

export interface StackObjectInit {
  id?: string | null;
}

export interface StackLayerInit extends StackObjectInit {
  pixelStack: PixelStack;
}

export interface StackImageInit extends StackObjectInit {
  imageSource: HTMLImageElement;
  imageFillMode?: StackImageData["imageFillMode"];
  imagePosition?: StackImageData["imagePosition"];
}
