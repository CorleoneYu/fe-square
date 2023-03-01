export const name = 'typescript is so difficult';

// enum 枚举

// interface 函数、对象、累

// type 值、对象、函数、数组、元组

// 父子关系，父可以赋值给子，子不可以赋值给父
// 父宽松，子严格
// X extends Y ? true : false 判断 X 是否为 Y 的子类型

// 泛型 泛型约束 extends

// https://github.com/type-challenges/type-challenges/blob/main/questions/00268-easy-if/README.zh-CN.md
type If<C extends boolean, T, F> = C extends true ? T : F;
type IFA = If<true, 'a', 'b'>; // expected to be 'a'
type IFB = If<false, 'a', 'b'>; // expected to be 'b'

// infer 关键字 => 函数的返回值
// 配合 extends
type ReturnType<T> = T extends (...args: any) => infer R ? R : never;
type GetSum = (a: number, b: number) => number;
type GetSumResult = ReturnType<GetSum>;

// https://github.com/type-challenges/type-challenges/blob/main/questions/00189-easy-awaited/README.zh-CN.md
type ExampleType = Promise<string>;
// 不严谨
type MyAwaited<T> = T extends Promise<infer R> ? R : T;
type PromiseResult = MyAwaited<ExampleType>;

// https://github.com/type-challenges/type-challenges/blob/main/questions/03312-easy-parameters/README.zh-CN.md
type MyParameters<T extends Function> = T extends (...args: infer Args extends any[]) => any ? Args : never;
const foo = (arg1: string, arg2: number): void => {};
type FunctionParamsType = MyParameters<typeof foo>; // [arg1: string, arg2: number]

// https://github.com/type-challenges/type-challenges/blob/main/questions/00002-medium-return-type/README.zh-CN.md
type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};
type a = MyReturnType<typeof fn>; // 应推导出 "1 | 2"

// readonly
// 可选

// keyof
// [Key in keyof T] 遍历

// ... 元组解构
// 元组不常用，跳过

// 字符串
// 当推断类型中没有字符串字面量作为边界时，第一个变量作为第一个字符，第二个变量代表剩下的字符，可以为空字符串。当然如果有三个变量，${A}${B}${C}，则第一个变量 A 代表第一个字符，B 代表第二个字符串，C 代表剩下的字符。
type MyCapitalize<T extends string> = T extends `${infer First}${infer Rest}` ? `${Uppercase<First>}${Rest}` : T;

type A = MyCapitalize<'hello'>; // "Hello"（First 为 "h"，Rest 为 "ello"）
type B = MyCapitalize<'b'>; // "B" （First 为 "h"，Rest 为空字符串）
type C = MyCapitalize<''>; // 当为空字符串时，会走到 false 的分支，返回空字符串

// 联合类型
