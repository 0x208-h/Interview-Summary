class TreeNode {
  constructor(val, left, right) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const a = [
  new TreeNode(1, null, new TreeNode(2, new TreeNode(3, null, null), null)),
];

// const res = [];

// const dfs = (root) => {
//   if (!root) return null;
//   dfs(root.left);
//   res.push(root.val);
//   dfs(root.right);
// };

// dfs(a[0]);
// console.log(res);

// const traversal = (root) => {
//   const res = [];
//   const stack = [];
//   while (stack.length || root) {
//     while (root) {
//       stack.push(root);
//       root = root.left;
//     }
//     root = stack.pop();
//     res.push(root.val);
//     root = root.right;
//   }
//   console.log(res);
// };

// traversal(a[0]);

const bfs = (root) => {
  const res = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    res.push(node.val);
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  console.log(res);
};

bfs(a[0]);
