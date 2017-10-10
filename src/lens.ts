const getKey = <T, Key extends keyof T>(key: Key) =>
  (value: T): T[Key] => 
  value[key]


const getOrKey = <T, Key extends keyof T, OrValue>(key: Key, orValue: OrValue & T[Key]) =>
  (value: T): T[Key] =>
  value[key] || orValue


const setKey = <T, Key extends keyof T>(key: Key, setValue: T[Key]) => 
  (value: T): T =>
  Object.assign(
    {},
    value,
    {
      [key]: setValue,
    },
  )

const constantFn = <T>(value: T) =>
  () =>
  value

const identity = <X>(x: X) =>
  x

/**
 * A lens is an object of getters and setter into a composable structure.
 * Useful for getting setting a complicated path while still preserving the typing of the object.
 * Lens will transform to and from domain A, B; A <=> B *
 */
export class Lens <A extends {}, B>{
  /** Way of converting A to B
   * Ex: Set in a object id<{ value }().thenKey('value').get({ value: 15 }) ---> 15
   */
  readonly get: (source: A) => B
  /** Setting some value of B in A, returning a updater function which should be pure update for an A
   * Ex: Set in a object id<{ value }().thenKey('value').set(5)({ value: 15 }) ---> { value: 5 }
   */
  readonly set: (value: B) => (source: A)  => A
  constructor(get: (source: A) => B, set: (value: B) => (source: A)  => A) {
    this.get = get
    this.set = set
  }
  
  /** Composing on another lens so we can extend the operations from an A -> C now
   * Ex: Use a fp.set and fp.get to use a path
   */
  then<C>(nextLens: Lens<B, C>) {
    const composedGet = (value: A) => {
      return nextLens.get(this.get(value))
    }
    const composedSet = (value: C) => {
      const composedSetFn = (source: A): A => (
        this.set(nextLens.set(value)(this.get(source)))(source)
      )
      return composedSetFn
    }
    return lensOf(
      composedGet,
      composedSet,
    )
  }

  /** Composing updating/ reading with a key to get/ set in B
   * Ex: Get/ Set value of a model of { value: number }
   */
  thenKey<Key extends keyof B>(key: Key) {
    return this.then(new Lens(
      getKey(key),
      (value: B[Key]) =>
        setKey<B, Key>(key, value),
    ))
  }
  /** Like thenKey but now we have a default
   * Ex: Get a value in a model dictionary or return the default
   */
  thenKeyOr<Key extends keyof B, C>(key: Key, defaultValue: C & B[Key]) {
    return this.then(new Lens(
      getOrKey(key, defaultValue),
      (value: C & B[Key]) =>
        setKey<B, Key>(key, value),
    ))
  }

  /**
   * Pass in a function in order to do a read and set combination
   * Ex: Increment the value, needs to read then write a new value
   */
  update(fn: (value: B) => B) {
    return (source: A) =>
      this.set(fn(this.get(source)))(source)
  }
}

/**
 * A factory for creating a lens. A lense is an object of getters and setter into a composable structure.
 * Useful for getting setting a complicated path while still preserving the typing of the object.
 * Lens will transform to and from domain A, B; A <=> B *
 */
const lensOf = <A, B>(get: (source: A) => B, set: (value: B) => (source: A) => A) => 
  new Lens(get, set)
  
const IdentityLens: Lens<any, any> = lensOf(
  identity,
  constantFn,
)

/**
 * Create the identity lens for a type, like a state.
 */
const idLens = <T>() => IdentityLens as Lens<T, T>

export default idLens;

export {
  idLens,
  lensOf,
}
