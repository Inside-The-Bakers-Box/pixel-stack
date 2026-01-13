import { nonNullable } from "broadutils/validate";
export const paper = document.createElement("canvas");
export const pen = nonNullable(paper.getContext("2d"));
//# sourceMappingURL=shared.js.map