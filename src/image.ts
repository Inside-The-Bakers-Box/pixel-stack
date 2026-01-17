import { StackObject } from "./object.ts";
import type { StackImageData, StackImageInit } from "./types.ts";
import { object } from "broadutils/data";
import type { Vector2 } from "broadutils/types";

export class StackImage extends StackObject {
  declare data: StackImageData;
  public constructor(init: StackImageInit) {
    super(init);
    const superData = super.getInternalData();
    this.data = object.mergeInto(superData, {
      imageSource: init.imageSource,
      imageFillMode: init.imageFillMode || "direct",
      imagePosition: init.imagePosition || [0, 0],
      imageDimensions: [1, 1],
      dimensionsMode: "relative",
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

  public imagePosition(value: Vector2 = this.data.imagePosition): Vector2 {
    const imagePosition = this.data.imagePosition;
    const changed = !(imagePosition[0] === value[0] && imagePosition[1] === value[1]);

    if (changed) {
      imagePosition[0] = value[0];
      imagePosition[1] = value[1];
      this.markCacheDirty();
    }

    return imagePosition;
  }

  public imageDimensions(value: Vector2 = this.data.imageDimensions): Vector2 {
    const imageDimensions = this.data.imageDimensions;
    const changed = !(imageDimensions[0] === value[0] && imageDimensions[1] === value[1]);

    if (changed) {
      imageDimensions[0] = value[0];
      imageDimensions[1] = value[1];
      this.markCacheDirty();
    }

    return imageDimensions;
  }

  public dimensionsMode(
    value: StackImageData["dimensionsMode"] = this.data.dimensionsMode,
  ): StackImageData["dimensionsMode"] {
    if (this.data.dimensionsMode !== value) {
      this.data.dimensionsMode = value;
      this.markCacheDirty();
    }

    return this.data.dimensionsMode;
  }

  public override render(): HTMLCanvasElement {
    if (this.data.cacheDirty) {
      const {
        cachedImage: { context },
        dimensions,
        imageSource,
        imageFillMode,
        imagePosition,
        imageDimensions,
        dimensionsMode,
      } = this.data;

      const imageSourceDimensions: Vector2 = [imageSource.width, imageSource.height];
      const getDimensionalValue = (value: number, dimensions: Vector2, axis: 0 | 1): number => {
        if (dimensionsMode === "direct") return value;
        return value * dimensions[axis];
      };

      let sx: number,
        sy: number,
        sw: number,
        sh: number,
        dx: number,
        dy: number,
        dw: number,
        dh: number;

      sx = getDimensionalValue(imagePosition[0], imageSourceDimensions, 0);
      sy = getDimensionalValue(imagePosition[1], imageSourceDimensions, 1);
      sw = getDimensionalValue(imageDimensions[0], imageSourceDimensions, 0);
      sh = getDimensionalValue(imageDimensions[1], imageSourceDimensions, 1);

      switch (imageFillMode) {
        case "direct": {
          dw = sw;
          dh = sh;
          break;
        }
        case "stretch": {
          dw = dimensions[0];
          dh = dimensions[1];
          break;
        }
        case "contain":
        case "cover": {
          const imageWidth = sw - sx;
          const imageHeight = sh - sy;
          const scale: Vector2 = [dimensions[0] / imageWidth, dimensions[1] / imageHeight];
          const scaleFactor = Math[imageFillMode === "contain" ? "min" : "max"](...scale);

          dw = imageWidth * scaleFactor;
          dh = imageHeight * scaleFactor;
        }
      }

      dx = 0;
      dy = 0;

      context.reset();
      context.globalAlpha = this.alpha();
      context.drawImage(imageSource, sx, sy, sw, sh, dx, dy, dw, dh);
      this.markCacheClean();
    }

    return this.data.cachedImage;
  }
}
