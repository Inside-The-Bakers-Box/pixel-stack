import type { Vector2 } from "broadutils/types";
import type { StackObjectData } from "./types.ts";

export class StackObject {
  protected data: StackObjectData;
  protected getInternalData(): StackObjectData {
    return this.data;
  }

  public constructor() {
    this.data = {
      dimensions: [1, 1],
      position: [0, 0],
      scale: [0, 0],
      alpha: 1,

      cachedImage: document.createElement("canvas"),
      cacheDirty: true,
    };
  }

  public dimensions(value: Vector2 = this.data.dimensions): Vector2 {
    const dimensions = this.data.dimensions;
    dimensions[0] = value[0];
    dimensions[1] = value[1];
    return dimensions;
  }

  public position(value: Vector2 = this.data.position): Vector2 {
    const position = this.data.position;
    position[0] = value[0];
    position[1] = value[1];
    return position;
  }

  public scale(value: Vector2 = this.data.scale): Vector2 {
    const scale = this.data.scale;
    scale[0] = value[0];
    scale[1] = value[1];
    return scale;
  }

  public alpha(value: number = this.data.alpha): number {
    return (this.data.alpha = value);
  }

  public markCacheDirty(): null {
    this.data.cacheDirty = true;
    return null;
  }
}
