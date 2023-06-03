const obj = {
  arr: [1, 2, 3],
  a: 4,
};
obj.sub = obj;
obj.arr.push(obj);

// JSON.parse(JSON.stringify(value)); 无法解决循环引用问题
const cloneDeep = (value) => {
  // 便于垃圾回收
  const cache = new WeakMap();
  const _cloneDeep = (value) => {
    if (value === null || typeof value !== 'object') {
      return value;
    }
    if (cache.has(value)) {
      return cache.get(value);
    }
    const result = Array.isArray(value) ? [] : {};
    cache.set(value, result);
    for (const key in value) {
      if (value.hasOwnProperty(key)) {
        result[key] = _cloneDeep(value[key]);
      }
    }
    return result;
  };
  return _cloneDeep(value);
};

const newObj = cloneDeep(obj);

console.log(newObj.arr !== obj.arr);
console.log(newObj.sub !== obj.sub);
console.log(newObj.arr[3] !== obj);
console.log(newObj.arr[3] === newObj);
