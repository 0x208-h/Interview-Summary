Array.prototype.myReduce = function (cb, inital) {
  // 不能使用箭头函数, this ***
  if (!Array.isArray(this)) throw new Error('this is not a array');
  if (typeof cb !== 'function') throw new Error('callback is not a function');
  let prev = inital,
    n = this;
  let len = n.length;

  if (prev === undefined) {
    prev = this[0];
    len--;
  }
  for (let i = 0; i < len; i++) {
    if (inital !== undefined) {
      prev = cb(prev, n[i], i, this);
    } else {
      prev = cb(prev, n[i + 1], i + 1, this);
    }
  }
  return prev;
};

console.log([1, 2, 3, 4].myReduce((a, b) => a + b, 0));
