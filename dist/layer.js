import { object } from "broadutils/data";
import { StackObject } from "./object.js";
export class Layer extends StackObject {
    data;
    constructor(pixelStack) {
        super();
        this.data = object.mergeInto(super.getInternalData(), { pixelStack });
    }
}
//# sourceMappingURL=layer.js.map