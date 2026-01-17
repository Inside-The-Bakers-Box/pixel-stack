import { StackObject } from "./object.js";
import { object } from "broadutils/data";
export class StackImage extends StackObject {
    constructor(init) {
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
    imageSource(value) {
        if (value && value !== this.data.imageSource) {
            this.data.imageSource = value;
            this.markCacheDirty();
        }
        return this.data.imageSource;
    }
    imageFillMode(value) {
        if (value && value !== this.data.imageFillMode) {
            this.data.imageFillMode = value;
            this.markCacheDirty();
        }
        return this.data.imageFillMode;
    }
    imagePosition(value = this.data.imagePosition) {
        const imagePosition = this.data.imagePosition;
        const changed = !(imagePosition[0] === value[0] && imagePosition[1] === value[1]);
        if (changed) {
            imagePosition[0] = value[0];
            imagePosition[1] = value[1];
            this.markCacheDirty();
        }
        return imagePosition;
    }
    imageDimensions(value = this.data.imageDimensions) {
        const imageDimensions = this.data.imageDimensions;
        const changed = !(imageDimensions[0] === value[0] && imageDimensions[1] === value[1]);
        if (changed) {
            imageDimensions[0] = value[0];
            imageDimensions[1] = value[1];
            this.markCacheDirty();
        }
        return imageDimensions;
    }
    dimensionsMode(value = this.data.dimensionsMode) {
        if (this.data.dimensionsMode !== value) {
            this.data.dimensionsMode = value;
            this.markCacheDirty();
        }
        return this.data.dimensionsMode;
    }
    render() {
        if (this.data.cacheDirty) {
            const { cachedImage: { context }, dimensions, imageSource, imageFillMode, imagePosition, imageDimensions, dimensionsMode, } = this.data;
            const imageSourceDimensions = [imageSource.width, imageSource.height];
            const getDimensionalValue = (value, dimensions, axis) => {
                if (dimensionsMode === "direct")
                    return value;
                return value * dimensions[axis];
            };
            let sx, sy, sw, sh, dx, dy, dw, dh;
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
                    const scale = [dimensions[0] / imageWidth, dimensions[1] / imageHeight];
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
//# sourceMappingURL=image.js.map