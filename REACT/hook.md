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
