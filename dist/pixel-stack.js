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
        this.addLayer("root");
    }
    dimensions(value = this.data.dimensions) {
        const dimensions = this.data.dimensions;
        dimensions[0] = value[0];
        dimensions[1] = value[1];
        return dimensions;
    }
    addLayer(layerId) {
        const layer = new Layer(layerId ?? null, this);
        this.data.layers.push(layer);
        return layer;
    }
    getLayer(layerId) {
        const layer = this.data.layers.find((l) => l.id() === layerId);
        return layer || null;
    }
}
//# sourceMappingURL=pixel-stack.js.map