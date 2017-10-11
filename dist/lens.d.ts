/**
 * A lens is an object of getters and setter into a composable structure.
 * Useful for getting setting a complicated path while still preserving the typing of the object.
 * Lens will transform to and from domain A, B; A <=> B *
 */
export declare class Lens<A extends {}, B> {
    /** Way of converting A to B
     * Ex: Set in a object id<{ value }().thenKey('value').get({ value: 15 }) ---> 15
     */
    readonly get: (source: A) => B;
    /** Setting some value of B in A, returning a updater function which should be pure update for an A
     * Ex: Set in a object id<{ value }().thenKey('value').set(5)({ value: 15 }) ---> { value: 5 }
     */
    readonly set: (value: B) => (source: A) => A;
    constructor(get: (source: A) => B, set: (value: B) => (source: A) => A);
    /** Composing on another lens so we can extend the operations from an A -> C now
     * Ex: Use a fp.set and fp.get to use a path
     */
    then<C>(nextLens: Lens<B, C>): Lens<A, C>;
    /** Composing updating/ reading with a key to get/ set in B
     * Ex: Get/ Set value of a model of { value: number }
     */
    thenKey<Key extends keyof B>(key: Key): Lens<A, B[Key]>;
    /** Like thenKey but now we have a default
     * Ex: Get a value in a model dictionary or return the default
     */
    thenKeyOr<Key extends keyof B, C>(key: Key, defaultValue: C & B[Key]): Lens<A, B[Key]>;
    /**
     * Pass in a function in order to do a read and set combination
     * Ex: Increment the value, needs to read then write a new value
     */
    update(fn: (value: B) => B): (source: A) => A;
}
/**
 * A factory for creating a lens. A lense is an object of getters and setter into a composable structure.
 * Useful for getting setting a complicated path while still preserving the typing of the object.
 * Lens will transform to and from domain A, B; A <=> B *
 */
declare const lensOf: <A, B>(get: (source: A) => B, set: (value: B) => (source: A) => A) => Lens<A, B>;
/**
 * Create the identity lens for a type, like a state.
 */
declare const idLens: <T>() => Lens<T, T>;
export default idLens;
export { idLens, lensOf };
