class MinHeap {
  constructor() {
    this.heap = [];
  }
  swap(i1, i2) {
    [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
  }
  // 获取父节点的idx
  getParentIndex(i) {
    return (i - 1) >> 1;
  }
  // 获取左侧子节点的idx
  getLeftIndex(i) {
    return 2 * i + 1;
  }
  // 获取右侧子节点的idx
  getRightIndex(i) {
    return 2 * i + 2;
  }
  // 上移
  //  判断当前节点的位置是否在堆的顶点处，如果是，则不进行上移操作；如果否，则继续进行比较；
  // 获取父节点的位置索引，获取索引的目的是为了获取该索引的具体值；
  // 将当前节点的值与父节点的值进行对比，如果父节点的值大于当前节点的值，则进行上移操作；
  // 递归进行上移操作，直到到达堆顶为止。
  shiftUp(idx) {
    if (idx === 0) {
      return;
    }
    const parentsIndex = this.getParentIndex(idx);
    if (this.heap[parentsIndex] > this.heap[idx]) {
      this.swap(parentsIndex, idx);
      this.shiftUp(parentsIndex);
    }
  }
  // 下移
  // 先获取左右侧节点；
  // 将左侧子节点与当前节点进行比较，如果左侧子节点比当前节点小，则进行位置交换，之后将交换完的节点继续进行比较；
  // 左侧节点比较完之后，接下来比较右侧节点；
  // 将右侧子节点与当前节点进行比较，如果右侧子节点比当前节点小，则进行位置交换，之后将交换完的节点继续进行比较；
  // 如此循环操作，直到最后一个节点为止。
  shiftDown(idx) {
    const leftIdx = this.getLeftIndex(idx);
    const rightIdx = this.getRightIndex(idx);
    if (this.heap[leftIdx] < this.heap[idx]) {
      this.swap(leftIdx, idx);
      this.shiftDown(leftIdx);
    }
    if (this.heap[rightIdx] < this.heap[idx]) {
      this.swap(rightIdx, idx);
      this.shiftDown(rightIdx);
    }
  }
  // insert
  // 将值插入堆的底部，即数组的尾部。
  // 然后上移：将这个值和它的父节点进行交换，直到父节点小于等于这个插入的值。
  // 大小为k的堆中插入元素的时间复杂度为 O(logK) 。
  insert(value) {
    this.heap.push(value);
    this.shiftUp(this.heap.length - 1);
  }
  // 删除堆顶元素
  // 用数组尾部元素替换堆顶（因为直接删除堆顶会破坏堆结构）。
  // 然后下移：将新堆顶和它的子节点进行交换，直到子节点大于等于这个新堆顶。
  // 大小为 k 的堆中删除堆顶的时间复杂度为 O(logK) 。
  pop() {
    this.heap[0] = this.heap.pop();
    this.shiftDown(0);
  }
  //获取堆顶的值
  peek() {
    return this.heap[0];
  }
  //获取堆的大小
  size() {
    return this.heap.length;
  }
}

const h = new MinHeap();
h.insert(3);
h.insert(2);
h.insert(1);
h.pop();
console.log(h); // MinHeap { heap: [ 2, 3 ] }
h.peek();
h.size();
console.log(h.peek()); // 2
console.log(h.size()); // 3

// const heap = heapify([...nums]);

// let res = 0;
// while (k--) {
//     res += heap[0];
//     heap[0] = Math.ceil(heap[0] / 3);
//     sink(heap, 0);
// }
// return res;

// function heapify(origin: number[]) {
//     for (let i = Math.floor(origin.length / 2) - 1; i >= 0; i--) {
//         sink(origin, i);
//     }
//     return origin;
// }

// function sink(heap: number[], i: number) {
//     while (i * 2 + 1 < heap.length) {
//         let index = i * 2 + 1;
//         if (index + 1 < heap.length && heap[index] < heap[index + 1]) {
//             index++;
//         }
//         if (heap[index] < heap[i]) {
//             break;
//         }
//         [heap[index], heap[i]] = [heap[i], heap[index]];
//         i = index;
//     }
// }
let heapSize = nums.length;
buildMaxHeap(nums, heapSize); // 构建好了一个大顶堆
// 进行下沉 大顶堆是最大元素下沉到末尾
for (let i = nums.length - 1; i >= nums.length - k + 1; i--) {
  swap(nums, 0, i);
  --heapSize; // 下沉后的元素不参与到大顶堆的调整
  console.log(nums);
  // 重新调整大顶堆
  maxHeapify(nums, 0, heapSize);
}
return nums[0];
// 自下而上构建一颗大顶堆
function buildMaxHeap(nums, heapSize) {
  for (let i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
    maxHeapify(nums, i);
  }
}
// 从左向右，自上而下的调整节点
function maxHeapify(nums, i) {
  let l = i * 2 + 1;
  let r = i * 2 + 2;
  let largest = i;
  if (l < heapSize && nums[l] > nums[largest]) {
    largest = l;
  }
  if (r < heapSize && nums[r] > nums[largest]) {
    largest = r;
  }
  if (largest !== i) {
    swap(nums, i, largest); // 进行节点调整
    // 继续调整下面的非叶子节点
    maxHeapify(nums, largest);
  }
}
function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}



var minStoneSum = function (piles, k) {
  heapify(piles); // 堆化
  while (k-- && piles[0] !== 1) {
    piles[0] -= Math.floor(piles[0] / 2); // 直接修改堆顶
    sink(piles, 0); // 堆化（只需要把 piles[0] 下沉）
  }
  return _.sum(piles);
};

// 原地堆化（最大堆）
// 堆化可以保证 h[0] 是堆顶元素，且 h[i] >= max(h[2*i+1], h[2*i+2])
function heapify(h) {
  // 倒着遍历，从而保证 i 的左右子树一定是堆，那么 sink(h, i) 就可以把左右子树合并成一个堆
  // 下标 >= h.length / 2 的元素是二叉树的叶子，无需下沉
  for (let i = Math.floor(h.length / 2) - 1; i >= 0; i--) {
    sink(h, i);
  }
}

// 把 h[i] 不断下沉，直到 i 的左右儿子都 <= h[i]
function sink(h, i) {
  const n = h.length;
  while (2 * i + 1 < n) {
    let j = 2 * i + 1; // i 的左儿子
    if (j + 1 < n && h[j + 1] > h[j]) {
      // i 的右儿子比 i 的左儿子大
      j++;
    }
    if (h[j] <= h[i]) {
      // 说明 i 的左右儿子都 <= h[i]，停止下沉
      break;
    }
    [h[i], h[j]] = [h[j], h[i]]; // 下沉
    i = j;
  }
}
