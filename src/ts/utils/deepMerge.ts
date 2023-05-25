import { isObject } from '@/utils';

const deepMerge = <T1, T2>(
  target: T1,
  source: T2
): T1 & T2 => {
  if (isObject(target) && isObject(source)) {
    for (var key in source) {
      if (isObject(source[key])) {
        deepMerge(target[key], source[key]);
      } else {
        (target[key] as any) = source[key] as any;
      }
    }
  }

  return target as T1 & T2;
};

export { deepMerge };
