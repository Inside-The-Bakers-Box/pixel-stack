import { object } from "broadutils/data";
import { StackObject } from "./object.ts";
import type { PixelStack } from "./pixel-stack.ts";
import type { LayerData } from "./types.ts";

export class Layer extends StackObject {
  protected override data: LayerData;
  public constructor(pixelStack: PixelStack) {
    super();
    this.data = object.mergeInto(super.getInternalData(), { pixelStack });
  }
}
