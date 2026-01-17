import { generateRandomId, getCanvasWithContext } from "./shared.js";
import { resize } from "broadutils/canvas";
export class StackObject {
    data;
    getInternalData() {
        return this.data;
    }
    constructor(init = {}) {
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
    id() {
        return this.data.id;
    }
    dimensions(value = this.data.dimensions) {
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
    position(value = this.data.position) {
        const position = this.data.position;
        position[0] = value[0];
        position[1] = value[1];
        return position;
    }
    scale(value = this.data.scale) {
        const scale = this.data.scale;
        scale[0] = value[0];
        scale[1] = value[1];
        return scale;
    }
    alpha(value = this.data.alpha) {
        this.data.alpha !== value && this.markCacheDirty();
        return (this.data.alpha = value);
    }
    markCacheDirty() {
        this.data.cacheDirty = true;
        return null;
    }
    markCacheClean() {
        this.data.cacheDirty = false;
        return null;
    }
    render() {
        throw new Error("Not implemented");
    }
}
//# sourceMappingURL=object.js.map