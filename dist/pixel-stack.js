import { nonNullable } from "broadutils/validate";
import { Layer } from "./layer.js";
export class PixelStack {
    static Layer = Layer;
    data;
    constructor() {
        const canvas = document.createElement("canvas");
        const context = nonNullable(canvas.getContext("2d"));
        this.data = {
            canvas,
            context,
            dimensions: [360, 180],
            layers: [],
        };
        this.dimensions(this.data.dimensions);
        this.addLayer();
    }
    dimensions(value = this.data.dimensions) {
        const dimensions = this.data.dimensions;
        dimensions[0] = value[0];
        dimensions[1] = value[1];
        return dimensions;
    }
    addLayer() {
        const layer = new Layer(this);
        this.data.layers.push(layer);
        return layer;
    }
}
//# sourceMappingURL=pixel-stack.js.map