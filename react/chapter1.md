# ReactJS與Component設計入門介紹

## ReactJS特性簡介

1. 基於元件（Component）化思考

2. 用JSX進行宣告式（Declarative）UI設計

3. 使用Virtual DOM

4. Component Prototype 防呆機制

5. Component 就像一個狀態機（State Machine），而且也有生命週期（Life Cycle）

6. 一律重繪（Always Redraw）和單向資料流（Unidirectional Data Flow）

7. 在JavaScript 裡寫CSS：Inline Style

### 什麼是元件（Component）？

在React中最基本的單元位元件（Component），每個元件也都可以包含一個以上的子元件，并依照需求組裝成一個組合式的（Composable）元件，所以具有封裝（encapsulation）、關注點分離（Separation of Concerns）、複用（Reuse）、組合 (Compose) 等特性。

而每一個元件都可以包含一個或以上的字元件，如```<TodoApp>``` 元件可以包含 ```<TodoHeader />```、```<TodoList />``` 子元件。

```
<div>
    <TodoHeader />
    <TodoList />
</div>
```

```<TodoList>```元件的內部長相：

```
<div>
    <ul>
      <li>寫程式碼</li>
      <li>哄妹子</li>
      <li>買書</li>
    </ul>
</div>
```

### 以下是一般React Component撰寫的主要兩種方式：

1.使用ES6的Class（可以進行比較複雜的操作和元件生命週期的控制，相對於stateless components來說更耗費資源）,例如：

```
//  注意元件開頭第一個字母都要大寫
class MyComponent extends React.Component {
  // render 是 Class based 元件唯一必須的方法（method）
  render() {
    return (
      <div>Hello, World!</div>
    );
  }
}

// 將 <MyComponent /> 元件插入 id 為 app 的 DOM 元素中
ReactDOM.render(<MyComponent/>, document.getElementById('app'));
```

2.使用Functional Component寫法（單純地 render UI 的 stateless components，沒有內部狀態、沒有實作物件和 ref，沒有生命週期函數。若非需要控制生命週期的話建議多使用 stateless components 獲得比較好的效能），例如：

```
// 使用 arrow function 來設計 Functional Component 讓 UI 設計更單純（f(D) => UI），減少副作用（side effect）
const MyComponent = () => (
  <div>Hello, World!</div>
);

// 將 <MyComponent /> 元件插入 id 為 app 的 DOM 元素中
ReactDOM.render(<MyComponent/>, document.getElementById('app'));
```