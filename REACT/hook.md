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
