export enum DelegateType {
  METHOD = 'method',
  GETTER = 'getter',
}

type DelegateMap<T> = Record<keyof T, DelegateType>;

export class Delegator<T, Target extends keyof T> {
  public static delegates<T, TKey extends keyof T>(
    proto: T,
    target: TKey,
    delegateMap: DelegateMap<T[TKey]>,
  ): Delegator<T, TKey> {
    const delegator = new Delegator<T, TKey>(proto, target);
    Object.entries(delegateMap).forEach(([key, delegateType]) => {
      // @ts-ignore
      delegator[delegateType as DelegateType](key as keyof T[TKey]);
    });
    return delegator;
  }

  private methods = new Set<keyof T[Target]>();
  private getters = new Set<keyof T[Target]>();

  private constructor(private proto: T, private target: Target) {}

  private method<TMethodKey extends keyof T[Target]>(key: TMethodKey) {
    if (this.methods.has(key)) {
      console.error('[delegator]出现相同的方法名');
    }
    this.methods.add(key);
    const { target } = this;
    // 往原型上挂方法
    (this.proto as unknown as T[Target])[key] = function (this: T, ...args: unknown[]) {
      return (this[target][key] as unknown as Function)(...args);
    } as unknown as T[Target][TMethodKey];
  }

  private getter(key: keyof T[Target]) {
    this.getters.add(key);
    const { target } = this;
    // 往原型上挂属性
    Object.defineProperty(this.proto, key, {
      get() {
        return this[target][key];
      },
    });
  }
}
