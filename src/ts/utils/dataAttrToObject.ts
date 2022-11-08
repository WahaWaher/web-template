import isObject from 'isobject';

type FreeObjectType = {
  [key in any]: any;
};

const dataAttrToObject = (dataAttr: any): FreeObjectType => {
  let res = {};

  if (typeof dataAttr !== 'string') {
    return res;
  }

  try {
    const parsedData: FreeObjectType = JSON.parse(dataAttr);

    if (isObject(parsedData)) {
      res = parsedData;
    }
  } catch (e) {}

  return res;
};

export { dataAttrToObject };
