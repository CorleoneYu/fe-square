type ImmutablePrimitive = undefined | null | boolean | string | number | Function;

export type Immutable<T> = T extends ImmutablePrimitive
  ? T
  : T extends Array<infer U>
  ? ImmutableArray<U>
  : T extends Map<infer K, infer V>
  ? ImmutableMap<K, V>
  : T extends Set<infer M>
  ? ImmutableSet<M>
  : ImmutableObject<T>;

export type Mutable<T> = T extends ImmutablePrimitive
  ? T
  : T extends ImmutableArray<infer U>
  ? MutableArray<U>
  : T extends ImmutableMap<infer K, infer V>
  ? MutableMap<K, V>
  : T extends ImmutableSet<infer M>
  ? MutableSet<M>
  : T extends ImmutableObject<infer O>
  ? MutableObject<O>
  : T;

type ImmutableArray<T> = ReadonlyArray<Immutable<T>>;
type ImmutableMap<K, V> = ReadonlyMap<Immutable<K>, Immutable<V>>;
type ImmutableSet<T> = ReadonlySet<Immutable<T>>;
type ImmutableObject<T> = { readonly [K in keyof T]: Immutable<T[K]> };

type MutableArray<T> = Array<Mutable<T>>;
type MutableMap<K, V> = Map<Mutable<K>, Mutable<V>>;
type MutableSet<T> = Set<Mutable<T>>;
type MutableObject<T> = { -readonly [K in keyof T]: Mutable<T[K]> };
