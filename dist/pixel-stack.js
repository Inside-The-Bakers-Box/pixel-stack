import { nonNullable } from "broadutils/validate";
import { StackLayer } from "./layer.js";
import { resize } from "broadutils/canvas";
export class PixelStack {
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
        resize(this.data.canvas, dimensions);
        return dimensions;
    }
    addLayer(layerId) {
        const layer = new StackLayer({ id: layerId ?? null, pixelStack: this });
        this.data.layers.push(layer);
        return layer;
    }
    getLayer(layerId) {
        const layer = this.data.layers.find((l) => l.id() === layerId);
        return layer || null;
    }
    getCanvas() {
        return this.data.canvas;
    }
    render() {
        const { context, dimensions, layers } = this.data;
        context.reset();
        for (const layer of layers) {
            const canvas = layer.render();
            context.drawImage(canvas, 0, 0, ...dimensions);
        }
        return null;
    }
}
//# sourceMappingURL=pixel-stack.js.map