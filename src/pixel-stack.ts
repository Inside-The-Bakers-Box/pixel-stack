import { nonNullable } from "broadutils/validate";
import { Layer } from "./layer.ts";
import type { PixelStackData } from "./types.ts";
import type { Vector2 } from "broadutils";

export class PixelStack {
  public static Layer = Layer;

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
    return dimensions;
  }

  public addLayer(layerId?: string): Layer {
    const layer = new Layer(layerId ?? null, this);
    this.data.layers.push(layer);
    return layer;
  }

  public getLayer(layerId: string): Layer | null {
    const layer = this.data.layers.find((l) => l.id() === layerId);
    return layer || null;
  }
}
