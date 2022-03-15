function selectSort(arr) {
  let len = arr.length;
  let minIndex = 0;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    [arr[minIndex], arr[i]] = [arr[i], arr[minIndex]];
  }
  return arr;
}

console.log(selectSort([2, 44, 5, 7, 8, 34, 12, 8, 56]));
