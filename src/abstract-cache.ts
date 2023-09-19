export abstract class AbstractCache {
    abstract get(key: string): any;
    abstract set(key: string, value: any): void;
}
