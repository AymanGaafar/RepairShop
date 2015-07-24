declare class Map<k, v>
{
    size: number;

    clear(): void;
    delete(key: k): boolean;
    entries(): Array<[k, v]>;
    forEach(callbackfn: (value: v, key: k, map: Map<k, v>) => void, thisArg?: any): void;
    get(key: k): v;
    has(key: k): boolean;
    keys(): Array<k>;
    set(key: k, value: v): Map<k, v>;
    values(): Array<v>;
}