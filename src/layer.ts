import { object } from "broadutils/data";
import { StackObject } from "./object.ts";
import type { PixelStack } from "./pixel-stack.ts";
import type { LayerData } from "./types.ts";

export class Layer extends StackObject {
  declare protected data: LayerData;
  public constructor(id: string | null, pixelStack: PixelStack) {
    super();
    const superData = super.getInternalData();
    this.data = object.mergeInto(superData, { id: id || superData.id, pixelStack });
  }
}
