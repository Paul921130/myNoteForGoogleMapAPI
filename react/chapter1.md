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

## 用JSX進行宣告式（Declarative）的UI設計

React 在設計上的思路認為使用 Component 比起模版（Template）和顯示邏輯（Display Logic）更能實現關注點分離的概念，而搭配 JSX 可以實現聲明式 Declarative（注重 what to），而非命令式 Imperative（注重 how to）的程式撰寫方式。

```
// 使用宣告式（Declarative）UI 設計很容易可以看出這個元件的功能
<MailForm />
```
```
// <MailForm /> 內部長相
<form>
  <input type="text" name="email" />
  <button type="submit"></button>
</form>
```

## Component PropType 防呆機制

在 React 設計時除了提供 props 預設值設定（Default Prop Values）外，也提供了 Prop 的驗證（Validation）機制，讓整個 Component 設計更加穩健：

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

// PropTypes 驗證，若傳入的 props type 不符合將會顯示錯誤
MyComponent.propTypes = {
  todo: React.PropTypes.object,
  name: React.PropTypes.string,
}

// Prop 預設值，若對應 props 沒傳入值將會使用 default 值
MyComponent.defaultProps = {
 todo: {}, 
 name: '', 
}
```

更多Validation用法可以參閱[官方網站](https://reactjs.org/docs/components-and-props.html)。

>Component 就像個狀態機（State Machine），根據不同的 state（透過 setState() 修改）和 props（由父元素傳入），Component 會出現對應的顯示結果。而人有生老病死，元件也有生命週期。透過操作生命週期處理函數，可以在對應的時間點進行 Component 需要的處理,關於更詳細的元件生命週期介紹打可參閱[xxx]()。

### 一律重繪（Always Redraw）和單向資料流（Unidirectional Data Flow）

在 React 世界中，props 和 state 是影響 React Component 長相的重要要素。其中 props 都是由父元素所傳進來，不能更改，若要更改 props 則必須由父元素進行更改。而 state 則是根據使用者互動而產生的不同狀態，主要是透過 setState() 方法進行修改。當 React 發現 props 或是 state 更新時，就會重繪整個 UI。當然你也可以使用 forceUpdate() 去強迫重繪 Component。而 React 透過整合 Flux 或 Flux-like（例如：Redux）可以更具體實現單向資料流（Unidirectional Data Flow），讓資料流的管理更為清晰。

## 在JavaScript裡寫CSS：Inline Style

在Rreact Component中CSS使用Inline Style寫法，全都封裝在JavaScript當中：

```
const divStyle = {
  color: 'red',
  backgroundImage: 'url(' + imgUrl + ')',
};

ReactDOM.render(<div style={divStyle}>Hello World!</div>, document.getElementById('app'));
```