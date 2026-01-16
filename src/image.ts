import { StackObject } from "./object.ts";
import type { StackImageData, StackImageInit } from "./types.ts";
import { object } from "broadutils/data";

export class StackImage extends StackObject {
  declare data: StackImageData;
  public constructor(init: StackImageInit) {
    super(init);
    const superData = super.getInternalData();
    this.data = object.mergeInto(superData, {
      imageSource: init.imageSource,
      imageFillMode: init.imageFillMode || "direct",
      imagePosition: init.imagePosition || [0, 0],
    });
  }

  public imageSource(value?: StackImageData["imageSource"]): StackImageData["imageSource"] {
    if (value && value !== this.data.imageSource) {
      this.data.imageSource = value;
      this.markCacheDirty();
    }

    return this.data.imageSource;
  }

  public imageFillMode(value?: StackImageData["imageFillMode"]): StackImageData["imageFillMode"] {
    if (value && value !== this.data.imageFillMode) {
      this.data.imageFillMode = value;
      this.markCacheDirty();
    }

    return this.data.imageFillMode;
  }

  public imagePosition(value?: StackImageData["imagePosition"]): StackImageData["imagePosition"] {
    if (value && value !== this.data.imagePosition) {
      this.data.imagePosition = value;
      this.markCacheDirty();
    }

    return this.data.imagePosition;
  }
}
