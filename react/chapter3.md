# Props、State、Refs與表單處理

>React Component實際上可以視為顯示UI的一個狀態機（state machine），而這個狀態機會根據不同的state（透過```setState()```來修改）和```props```（由父元素傳入），Component會出現對應的顯示結果。

## 什麼是Props

首先使用React官網上的A Simple Component來說明props的使用方式，由於傳入的元件的```name```屬性為```Mark```，故以下程式碼將會在瀏覽器顯示Hello,Mark。針對傳入的props也有驗證和預設值的設計。

HTML Markup：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>A Component Using External Plugins</title>
</head>
<body>
<!-- 這邊方便使用 CDN 方式引入 react 、 react-dom 進行講解，實務上和實戰教學部分我們會使用 webpack -->
<script src="https://fb.me/react-15.1.0.js"></script>
<script src="https://fb.me/react-dom-15.1.0.js"></script>
  <div id="app"></div>
  <script src="./app.js"></script>
</body>
</html>
```

app.js，只用ES6 Class Component寫法：

```
class HelloMessage extends React.Component {
  // 若是需要綁定 this.方法或是需要在 constructor 使用 props，定義 state，就需要 constructor。若是在其他方法（如 render）使用 this.props 則不用一定要定義 constructor
  constructor(props) {
    // 對於 OOP 物件導向程式設計熟悉的讀者應該對於 constructor 建構子的使用不陌生，事實上它是 ES6 的語法糖，骨子裡還是 prototype based 物件導向程式語言。透過 extends 可以繼承 React.Component 父類別。super 方法可以呼叫繼承父類別的建構子
    super(props);
    this.state = {}
  }
  // render 是唯一必須的方法，但如果是單純 render UI 建議使用 Functional Component 寫法，效能較佳且較簡潔
  render() {
    return (
      <div>Hello {this.props.name}</div>
    )
  }
}

// PropTypes 驗證，若傳入的 props type 不是 string 將會顯示錯誤
HelloMessage.propTypes = {
  name: React.PropTypes.string,
}

// Prop 預設值，若對應 props 沒傳入值將會使用 default 值 Zuck
HelloMessage.defaultProps = {
 name: 'Zuck',
}

ReactDOM.render(<HelloMessage name="Mark" />, document.getElementById('app'));
```

關於React ES6 class constructor super()解釋可以參考[React ES6 class constructor super() ](http://cheng.logdown.com/posts/2016/03/26/683329)。

使用Functional Component寫法：

```
// Functional Component 可以視為 f(d) => UI，根據傳進去的 props 繪出對應的 UI。注意這邊 props 是傳入函式的參數，因此取用 props 不用加 this
const HelloMessage = (props) => (
  <div>Hello {props.name}</div>
);

// PropTypes 驗證，若傳入的 props type 不是 string 將會顯示錯誤
HelloMessage.propTypes = {
  name: React.PropTypes.string,
}

// Prop 預設值，若對應 props 沒傳入值將會使用 default 值 Zuck。用法等於 ES5 的 getDefaultProps
HelloMessage.defaultProps = {
 name: 'Zuck',
}

ReactDOM.render(<HelloMessage name="Mark" />, document.getElementById('app'));
```

在jsbin上的範例：[查看範例...](http://jsbin.com/wadice/embed?html,js,console,output)

## State

React Component 可以自己管理自己的內部state，并用this.state來存取state。當```setState()```方法更新了state后將重新呼叫```render()```方法，重新繪製component內容，以下的A Statefull Component這個範例是一個每1000ms(等於1秒)就會加一的累加器，由於這個範例是Stateful Component 因此僅使用ES6 Class Component，而不使用Functional Component。

HTM Markup：
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>A Component Using External Plugins</title>
</head>
<body>
<script src="https://fb.me/react-15.1.0.js"></script>
<script src="https://fb.me/react-dom-15.1.0.js"></script>
  <div id="app"></div>
  <script src="./app.js"></script>
</body>
</html>
```

app.js

```
class Timer extends React.Component {
  constructor(props) {
    super(props);
    // 與 ES5 React.createClass({}) 不同的是 component 內自定義的方法需要自行綁定 this context，或是使用 arrow function
        this.tick = this.tick.bind(this);
    // 初始 state，等於 ES5 中的 getInitialState
    this.state = {
      secondsElapsed: 0,
    }
  }
  // 累加器方法，每一秒被呼叫後就會使用 setState() 更新內部 state，讓 Component 重新 render
  tick() {
      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  }
  // componentDidMount 為 component 生命週期中階段 component 已插入節點的階段，通常一些非同步操作都會放置在這個階段。這便是每1秒鐘會去呼叫 tick 方法
  componentDidMount() {
      this.interval = setInterval(this.tick, 1000);
  }
  // componentWillUnmount 為 component 生命週期中 component 即將移出插入的節點的階段。這邊移除了 setInterval 效力
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  // render 為 class Component 中唯一需要定義的方法，其回傳 component 欲顯示的內容
  render() {
      return (
        <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
      );
  }
}

ReactDOM.render(<Timer />, document.getElementById('app'));
```

關於Javascript this 的用法可以參考[Javascript：this用法整理](https://software.intel.com/zh-cn/blogs/2013/10/09/javascript-this)。

## 事件處理（Event Handle）

以下將使用React官網的An Application當做例子，實作一個簡單的TodoApp。

HTML Markup：

```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>A Component Using External Plugins</title>
</head>
<body>
<script src="https://fb.me/react-15.1.0.js"></script>
<script src="https://fb.me/react-dom-15.1.0.js"></script>
  <div id="app"></div>
  <script src="./app.js"></script>
</body>
</html>
```

app.js：
```
// TodoApp 元件中包含了顯示 Todo 的 TodoList 元件，Todo 的內容透過 props 傳入 TodoList 中。由於 TodoList 僅單純 Render UI 不涉及內部 state 操作是 stateless component，所以使用 Functional Component 寫法。需要特別注意的是這邊我們用 map function 來迭代 Todos，需要留意的是每個迭代的元素必須要有 unique key 不然會發生錯誤（可以用自定義 id，或是使用 map function 的第二個參數 index）
const TodoList = (props) => (
  <ul>
    {
      props.items.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))
    }
  </ul>
)

// 整個 App 的主要元件，這邊比較重要的是事件處理的部份，內部有
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      items: [],
      text: '',
    }
  }
  onChange(e) {
      this.setState({text: e.target.value});
  }
  handleSubmit(e) {
      e.preventDefault();
      const nextItems = this.state.items.concat([{text: this.state.text, id: Date.now()}]);
      const nextText = '';
      this.setState({items: nextItems, text: nextText});
  }
  render() {
      return (
        <div>
          <h3>TODO</h3>
          <TodoList items={this.state.items} />
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.onChange} value={this.state.text} />
            <button>{'Add #' + (this.state.items.length + 1)}</button>
          </form>
        </div>
      );
  }
}

ReactDOM.render(<TodoApp />, document.getElementById('app'));
```