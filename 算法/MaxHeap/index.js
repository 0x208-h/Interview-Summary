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
