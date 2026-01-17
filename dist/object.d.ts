import type { Vector2 } from "broadutils/types";
import type { StackObjectData, StackObjectInit } from "./types.ts";
export declare class StackObject {
    protected data: StackObjectData;
    protected getInternalData(): StackObjectData;
    constructor(init?: StackObjectInit);
    id(): string;
    dimensions(value?: Vector2): Vector2;
    position(value?: Vector2): Vector2;
    scale(value?: Vector2): Vector2;
    alpha(value?: number): number;
    markCacheDirty(): null;
    protected markCacheClean(): null;
    render(): HTMLCanvasElement;
}
//# sourceMappingURL=object.d.ts.map