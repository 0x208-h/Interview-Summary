function merge(left, right) {
  let temp = [];
  while (left.length && right.length) {
    if (left[0] < right[0]) {
      temp.push(left.shift());
    } else {
      temp.push(right.shift());
    }
  }
  return temp.concat(left, right);
}

function mergeSort(arr) {
  let length = arr.length;
  if (length <= 1) return arr;
  let mid = length >> 1;
  let left = arr.slice(0, mid),
    right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}

console.log(mergeSort([2, 44, 5, 7, 8, 34, 12, 8, 56]));
