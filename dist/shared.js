import { nonNullable } from "broadutils/validate";
import { object } from "broadutils/data";
export const paper = document.createElement("canvas");
export const pen = nonNullable(paper.getContext("2d"));
export const getCanvasWithContext = () => {
    const canvas = document.createElement("canvas");
    const context = nonNullable(canvas.getContext("2d"));
    return object.mergeInto(canvas, { context });
};
export const generateRandomId = (stackObject) => {
    const constructorName = Object.getPrototypeOf(stackObject).constructor.name;
    const randomNumber = Math.floor(1e5 + Math.random() * (1e6 - 1e5)); // six-digits
    return `${constructorName}-${randomNumber}`;
};
//# sourceMappingURL=shared.js.map