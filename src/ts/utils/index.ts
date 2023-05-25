// ---
// Type Guard Utils
// ---
export const isString = (value: unknown): value is string =>
  typeof value === 'string';

export const isNumber = (value: unknown): value is number =>
  typeof value === 'number';

export const isFunction = (value: unknown): value is Function =>
  typeof value === 'function';

export const isUndefined = (value: unknown): value is undefined =>
  value === undefined;

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const isArray = <T>(value: T[]): value is T[] => value instanceof Array;

// ---
// Native Functions Wrappers
// ---
export const objectKeys = <T extends { [K in string]: any }>(
  obj: T
): (keyof T)[] => Object.keys(obj) as (keyof T)[];

export const objectEntries = Object.entries as <T>(
  o: T
) => [Extract<keyof T, string>, T[keyof T]][];

// ---
// Arrays
// ---
export const isFirstIndex = <V>(index: number, array: V[]): boolean =>
  array.length > 0 && index === 0;

export const isLastIndex = <V>(index: number, array: V[]): boolean =>
  array.length > 0 && index === array.length - 1;
