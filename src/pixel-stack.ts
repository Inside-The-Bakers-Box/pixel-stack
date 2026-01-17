import { nonNullable } from "broadutils/validate";
import { StackLayer } from "./layer.ts";
import type { PixelStackData } from "./types.ts";
import type { Vector2 } from "broadutils";
import { resize } from "broadutils/canvas";

export class PixelStack {
  protected data: PixelStackData;
  public constructor() {
    const canvas = document.createElement("canvas");
    const context = nonNullable(canvas.getContext("2d"));

    this.data = {
      canvas,
      context,
      dimensions: [360, 180],
      layers: [],
    };

    this.dimensions(this.data.dimensions);
    this.addLayer("root");
  }

  public dimensions(value: Vector2 = this.data.dimensions): Vector2 {
    const dimensions = this.data.dimensions;
    dimensions[0] = value[0];
    dimensions[1] = value[1];
    resize(this.data.canvas, dimensions);
    return dimensions;
  }

  public addLayer(layerId?: string): StackLayer {
    const layer = new StackLayer({ id: layerId ?? null, pixelStack: this });
    this.data.layers.push(layer);
    return layer;
  }

  public getLayer(layerId: string): StackLayer | null {
    const layer = this.data.layers.find((l) => l.id() === layerId);
    return layer || null;
  }

  public getCanvas(): HTMLCanvasElement {
    return this.data.canvas;
  }

  public render(): null {
    const { context, dimensions, layers } = this.data;

    context.reset();
    for (const layer of layers) {
      const canvas = layer.render();
      context.drawImage(canvas, 0, 0, ...dimensions);
    }

    return null;
  }
}
