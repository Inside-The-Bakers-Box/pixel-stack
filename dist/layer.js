import { object } from "broadutils/data";
import { StackObject } from "./object.js";
export class StackLayer extends StackObject {
    constructor(init) {
        super(init);
        const superData = super.getInternalData();
        this.data = object.mergeInto(superData, { objects: new Set(), pixelStack: init.pixelStack });
    }
    addObject(object) {
        if (this.data.objects.has(object))
            return false;
        this.data.objects.add(object);
        this.markCacheDirty();
        return true;
    }
    removeObject(object) {
        if (!this.data.objects.has(object))
            return false;
        this.data.objects.delete(object);
        this.markCacheDirty();
        return true;
    }
    render() {
        const { objects, cachedImage, cacheDirty } = this.data;
        if (cacheDirty) {
            const alpha = this.alpha();
            const { context } = cachedImage;
            context.reset();
            context.globalAlpha = alpha;
            for (const object of objects) {
                console.log(object.position(), object.dimensions());
                context.drawImage(object.render(), ...object.position(), ...object.dimensions());
            }
            this.markCacheClean();
        }
        return cachedImage;
    }
}
//# sourceMappingURL=layer.js.map