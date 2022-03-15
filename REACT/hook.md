# React

## 模拟

### useState

```tsx
import React from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const onClick = () => {
    setCount(count + 1);
  };
  const onClickName = () => {
    setName(`${name} ${Math.random()}`);
  };
  return (
    <div>
      <div>{count}</div>
      <button onClick={onClick}>点击count</button>
      <div>{name}</div>
      <button onClick={onClickName}>点击name</button>
    </div>
  );
}
// react 使用的是单向链表
let stateArray: any[] = [];
let cursor: number = 0;
function useState<T>(initialState: T): [T, (newState: T) => void] {
  const currentCursor = cursor;
  stateArray[currentCursor] = stateArray[currentCursor] || initialState;
  // state = state || initialState;

  function setState(newState: T): void {
    stateArray[currentCursor] = newState;
    render();
  }

  ++cursor;

  return [stateArray[currentCursor], setState];
}

export function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Counter />
    </React.StrictMode>,
    document.getElementById("root")
  );
  cursor = 0;
}
```

```tsx
// index.tsx
// import React from "react";

import { render } from "./hooks-components//mock-components";
render();
```

### useEffect

```tsx
import React, { useState } from "react";
import ReactDOM from "react-dom";

function Counter() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(1);

  useEffect(() => {
    effectCursor = 0;
    console.log(`count 发生了改变${count}`);
  }, [count]);

  useEffect(() => {
    console.log(`count1 发生了改变${count1}`);
  }, [count1]);
  const onClick = () => {
    setCount(count + 1);
  };
  const onClickName = () => {
    setCount1(count1 + 1);
  };
  return (
    <div>
      <div>{count}</div>
      <button onClick={onClick}>点击count</button>
      <div>{count1}</div>
      <button onClick={onClickName}>点击count1</button>
    </div>
  );
}

const allDeps: Array<any[] | undefined> = [];

let effectCursor: number = 0;

function useEffect(callback: () => void, depArray?: any[]): void {
  if (!depArray) {
    callback();
    allDeps[effectCursor] = depArray;
    effectCursor++;
    return;
  }
  // 代表上一次存储的依赖项数据， depArray本次依赖项数据
  const deps = allDeps[effectCursor];
  const hasChanged = deps ? depArray.some((el, i) => el !== deps[i]) : true;

  if (hasChanged) {
    callback();
    allDeps[effectCursor] = depArray;
  }
  effectCursor++;
}

export function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Counter />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
```

## diff 算法

diff 算法只会比较再会在同层级进行比较， 不会跨层级比较 DFS O(n)

1. 通过 patch 方法 判断当前的同层的虚拟节点是否是同一类型的标签，是，继续执行 patchVode 进行深层比对，否，直接整个节点替换成新虚拟节点

判断 key、 tagName(标签名)、 isComment(注释节点)、input 标签的类型等

2. pathVnode 方法，找到对应的真实 DOM，称为 el

判断 newVnode 和 oldVnode 是否指向同一个对象，如果是，直接 return
如果他们都有本文节点并且不相等，则 el 的文本节点设置为 newVnode 的文本节点
如果 oldVnode 有子节点而 newVnode 没有，则删除 el 的子节点。
如果 oldVnode 没有子节点 而 newVnode 有子节点，则将 newVnode 的子节点 真实化添加到 el
如果两者都有子节点，则执行 updateChildren 方法比较子节点。

3. updateChildren 方法，采用首尾指针法

旧的子节点集合 和 新的子节点集合 各有首尾两个指针，进行互相比较

遍历结束时机 oldS > oldE, newS > newE

oldS 和 newS 使用 sameVnode 方法进行比较，sameVnode(oldS, newS)， oldS++, newS++
oldS 和 newE 使用 sameVnode 方法进行比较，sameVnode(oldS, newE), oldS++, newE--
oldE 和 newS 使用 sameVnode 方法进行比较，sameVnode(oldE, newS), oldE--, newS++
oldE 和 newE 使用 sameVnode 方法进行比较，sameVnode(oldE, newE), oldE--, newE--

如果以上逻辑都匹配不到，在吧所有旧子节点的 key 做一个 映射到旧节点下标的 key -> index 表，然后用新的 vnode 的 key 去找出在旧节点中可以复用的位置。

### 生命周期

- 装载阶段（Mount），组件第一次在 DOM 树中被渲染的过程；
  挂载阶段组件被创建，然后组件实例插入到 DOM 中，完成组件的第一次渲染，该过程只会发生一次，在此阶段会依次调用以下这些方法：

  constructor
  getDerivedStateFromProps
  render
  componentDidMount

- 更新过程（Update），组件状态发生变化，重新更新渲染的过程；
  static getDerivedStateFromProps(newProps, preState)
  shouldComponentUpdate(nextProps, nextState)
  render
  getSnapshotBeforeUpdate(prevProps, prevState)
  componentDidUpdate(prevProps, prevState, snapshot){}
- 卸载过程（Unmount），组件从 DOM 树中被移除的过程；
  componentWillUnmount()
  清除 timer，取消网络请求或清除
  取消在 componentDidMount() 中创建的订阅等；

### 状态管理

redux VS mobx

redux
数据不可变，只可读
单一数据源
纯函数 Reducer 来修改状态

redux 中间件
redux-thunk

```jsx
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument);
      }

      return next(action);
    };
}
```

redux-saga 借助 generate 函数
提供了许多方法 takeEvery takeLast put call fork
toolkit
不需要写太多的模版代码
