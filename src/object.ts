import type { Vector2 } from "broadutils/types";
import type { StackObjectData, StackObjectInit } from "./types.ts";
import { generateRandomId, getCanvasWithContext } from "./shared.ts";
import { resize } from "broadutils/canvas";

export class StackObject {
  protected data: StackObjectData;
  protected getInternalData(): StackObjectData {
    return this.data;
  }

  public constructor(init: StackObjectInit = {}) {
    this.data = {
      id: init.id ?? generateRandomId(this),

      dimensions: [1, 1],
      position: [0, 0],
      scale: [0, 0],
      alpha: 1,

      cachedImage: getCanvasWithContext(),
      cacheDirty: true,
    };
  }

  public id(): string {
    return this.data.id;
  }

  public dimensions(value: Vector2 = this.data.dimensions): Vector2 {
    const dimensions = this.data.dimensions;
    const changed = !(dimensions[0] === value[0] && dimensions[1] === value[1]);

    if (changed) {
      dimensions[0] = value[0];
      dimensions[1] = value[1];
      resize(this.data.cachedImage, dimensions);
      this.markCacheDirty();
    }

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
    this.data.alpha !== value && this.markCacheDirty();
    return (this.data.alpha = value);
  }

  public markCacheDirty(): null {
    this.data.cacheDirty = true;
    return null;
  }

  protected markCacheClean(): null {
    this.data.cacheDirty = false;
    return null;
  }

  public render(): HTMLCanvasElement {
    throw new Error("Not implemented");
  }
}
