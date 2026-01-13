import { object } from "broadutils/data";
import { StackObject } from "./object.js";
export class Layer extends StackObject {
    constructor(id, pixelStack) {
        super();
        const superData = super.getInternalData();
        this.data = object.mergeInto(superData, { id: id || superData.id, pixelStack });
    }
}
//# sourceMappingURL=layer.js.map