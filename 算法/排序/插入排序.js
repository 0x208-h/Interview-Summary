function insertSort(arr) {
  let temp;
  for (let i = 0; i < arr.length; i++) {
    temp = arr[i];
    for (let j = i; j >= 0; j--) {
      if (arr[j - 1] > temp) {
        arr[j] = arr[j - 1];
      } else {
        arr[j] = temp;
        break;
      }
    }
  } 
  // O(n ^ 2)
  return arr;
}

console.log(insertSort([2, 44, 5, 7, 8, 34, 12, 8, 56]));
