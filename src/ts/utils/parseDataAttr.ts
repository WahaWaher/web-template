import { isObject } from '@/utils';

type UnknownObject = Record<string, unknown>;

const parseDataAttr = (dataAttr: unknown): UnknownObject => {
  let res = {};

  if (typeof dataAttr !== 'string') {
    return res;
  }

  try {
    const parsedData: UnknownObject = JSON.parse(dataAttr);

    if (isObject(parsedData)) {
      res = parsedData;
    }
  } catch (e) {}

  return res;
};

export { parseDataAttr };
