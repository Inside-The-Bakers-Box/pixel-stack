import type { Vector2 } from "broadutils/types";
import type { StackObjectData } from "./types.ts";
export declare class StackObject {
    protected data: StackObjectData;
    protected getInternalData(): StackObjectData;
    constructor();
    dimensions(value?: Vector2): Vector2;
    position(value?: Vector2): Vector2;
    scale(value?: Vector2): Vector2;
    alpha(value?: number): number;
    markCacheDirty(): null;
}
//# sourceMappingURL=object.d.ts.map