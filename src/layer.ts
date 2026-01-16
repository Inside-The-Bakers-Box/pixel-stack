import { object } from "broadutils/data";
import { StackObject } from "./object.ts";
import type { StackLayerData, StackLayerInit } from "./types.ts";

export class StackLayer extends StackObject {
  declare protected data: StackLayerData;
  public constructor(init: StackLayerInit) {
    super(init);
    const superData = super.getInternalData();
    this.data = object.mergeInto(superData, { objects: new Set(), pixelStack: init.pixelStack });
  }

  public addObject(object: StackObject): boolean {
    if (this.data.objects.has(object)) return false;

    this.data.objects.add(object);
    this.markCacheDirty();

    return true;
  }

  public removeObject(object: StackObject): boolean {
    if (!this.data.objects.has(object)) return false;

    this.data.objects.delete(object);
    this.markCacheDirty();

    return true;
  }

  public override render(): HTMLCanvasElement {
    const { objects, cachedImage, cacheDirty } = this.data;

    if (cacheDirty) {
      const alpha = this.alpha();
      const { context } = cachedImage;

      context.reset();
      context.globalAlpha = alpha;

      for (const object of objects) {
        context.drawImage(object.render(), ...object.position(), ...object.dimensions());
      }

      this.markCacheClean();
    }

    return cachedImage;
  }
}
