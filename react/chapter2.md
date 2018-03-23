# JSX入門教學指南

## 使用JSX的好處

### 提供語意更加簡單易懂的標籤

JSX有點類似於XML的語法，可以精確定義包含屬性的樹狀結構，以一個HTML架構一個回饋表單來看，寫法通常會長這個樣子：

```html
<form class="messageBox">
  <textarea></textarea>
  <button type="submit"></button>
</form>
```

但如果使用JSX，就像XML語法結構一樣可以自行定義標籤,更容易理解。
```
<MessageBox />
```

### 聲明式Declarative與命令式Imperative

>對于React來說，Component 比起模版（Template）和顯示邏輯（Display Logic）更能實現關注點分離的概念，而搭配 JSX 可以實現聲明式 Declarative（注重 what to），而非命令式 Imperative（注重 how to）的程式撰寫方式。

以FB的按讚功能來看，如果是命令式（Imperative）的寫法大概會是長這個樣子。

```js
if(userLikes()) {
  if(!hasBlueLike()) {
    removeGrayLike();
    addBlueLike();
  }
} else {
  if(hasBlueLike()) {
    removeBlueLike();
    addGrayLike();
  }
}
```

而如果使用聲明式（Declarative）的則是這樣：

```js
if(this.state.liked) {
  return (<BlueLike />);
} else {
  return (<GrayLike />);
}
```

### 更加簡潔

雖然JSX最終會被轉換成JavaScript，但使用JSX可以讓程式看起來更加簡潔，以下是使用JSX和不使用JSX的範例：

```html
<a href="https://facebook.github.io/react/">Hello!</a>
```

而不使用JSX的話就會顯得更為複雜：

```js
// React.createElement(元件/HTML標籤, 元件屬性，以物件表示, 子元件)
React.createElement('a', {href: 'https://facebook.github.io/react/'}, 'Hello!')
```

### 可結合原生的JavaScript語法

JSX并非是一種全新的語言，而是一種語法糖（Syntatic Sugar），類似於XML的ECMAScript語法擴充，所以并沒有改變JavaScript語意，透過JavaScript，可以使用JavaScript語言本身的能力，下面就是```map```方法，輕易把```result```值迭代出來，產生無序清單（ul）的內容，不用再使用蹩腳的模板語言（注意：每個```<li>```元素記得加上獨特額key，這邊用map function迭代出的index，不然會有問題）：

```js
// const 為常數
const lists = ['JavaScript', 'Java', 'Node', 'Python'];

class HelloMessage extends React.Component {
  render() {
    return (
    <ul>
      {lists.map((result, index) => {
        return (<li key={index}>{result}</li>);
      })}
    </ul>);
  }
}
```

## JSX用法

### 環境設定與使用方法

一般而言，JSX通常有兩種使用方式：

1. 使用  browserify 或 webpack 等 CommonJS bundler 並整合 babel 預處理。

2. 於瀏覽器端做解析。

以下是簡單的JSX語法使用範例：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello React!</title>
    <!-- 請先於 index.html 中引入 react.js, react-dom.js 和 babel-core 的 browser.min.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.min.js"></script>
  </head>
  <body>
    <div id="example"></div>
    <script type="text/babel">
      // 程式碼寫在這邊！
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('example')
      );
    </script>
  </body>
</html>
```

一般載入JSX方式如下：

* 內嵌

```html
<script type="text/babel">
  ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('example')
  );
</script>
```

* 從外部引入

```html
<script type="text/jsx" src="main.jsx"></script>
```

### 標籤用法

JSX標籤非常類似於XML，可以直接書寫，一般Component命名首字母大寫，HTMl Tags小寫，以下是一個建立Component的class：

```js
class HelloMessage extends React.Component {
  render() {
    return (
      <div>
        <p>Hello React!</p>
        <MessageList />
      </div>
    );
  }
}
```

### 轉換成JavaScript

JSX最終會轉換成瀏覽器可以讀取的JavaScript，以下為其規則：

```js
React.createElement(
  string/ReactClass, // 表示 HTML 元素或是 React Component
  [object props], // 屬性值，用物件表示
  [children] // 接下來參數皆為元素子元素
)
```

解析前（特別注意在JSX中使用JavaScript表達式使用{}括起，如下方範例的```text```，裡面對應的是變數。若需放置一般文字，請加上```''```）:

```js
var text = 'Hello React';
<h1>{text}</h1>
<h1>{'text'}</h1>
```

解析完后：

```js
var text = 'Hello React';
React.createElement("h1", null, "Hello React!");
```

另外要特別注意的是由於JSX最終會轉成JavaScript 且每一個JSX節點都對應一個JavaScript函數，所以在Component的render方法中只能回傳一個根節點（Root Nodes）例如：若有多個```<div>```要```render```請在外面包一個Component或```<div>```、```<span>```元素。

### 註解

由於JSX最終會編譯JavaScript，所以註解一樣可以使用```//```和```/**/```當做註解方式：

```js
// 單行註解

/*
  多行註解
*/

var content = (
  <List>
      {/* 若是在子元件註解要加 {}  */}
      <Item
        /* 多行
           註解
           喔 */
        name={window.isLoggedIn ? window.name : ''} // 單行註解
      />
  </List>
);
```

### 屬性

在HTML中，可透過標籤上的屬性來改變標籤外觀樣式，在JSX中也可以，但要注意```class```和```for```由於為JavaScript保留關鍵字用法，因此在JSX中使用```className```和```htmlFor```替代。

```js
class HelloMessage extends React.Component {
  render() {
    return (
      <div className="message">
        <p>Hello React!</p>
      </div>
    );
  }
}
```

Boolean屬性

在JX中預設只有屬性名稱但沒設置為```true```，例如以下第一個input標籤```disabled```雖然沒設值，但結果和下面的input為相同：

```html
<input type="button" disabled />;
<input type="button" disabled={true} />;
```

反之，若是沒有屬性，則預設為```false```:
```html
<input type="button" />;
<input type="button" disabled={false} />;
```

### 擴展屬性

在ES6中使用(...)運算符是迭代物件的意思，可以把所有物件對應的值迭代出來設定屬性。注意：後面設定的屬性會覆蓋掉前面相同的屬性，例如：

```js
var props = {
  style: "width:20px",
  className: "main",
  value: "yo",  
}

<HelloMessage  {...props} value="yo" />

// 等於以下
React.createElement("h1", React._spread({}, props, {value: "yo"}), "Hello React!");
``` 

### 自定義屬性

若是希望使用自定義屬性，可以使用```data-```：

```html
<HelloMessage data-attr="xd" />
```

### 顯示HTML

通常為了避免資訊安全問題，會過濾掉HTML，如果需要顯示的話可以使用：

```html
<div>{{_html: '<h1>Hello World!!</h1>'}}</div>
```

### 樣式使用

在JSX中使用外觀樣式的方法如下，第一個{}是JSX語法，第二個為JavaScript物件。與一般屬性值用```-```來區隔不同，一般採用駝峰式的命名寫法：

```html
<HelloMessage style={{ color: '#FFFFFF', fontSize: '30px'}} />
```

### 事件處理

在JSX中透過inline事件的綁定來監聽并處理事件（跟樣式使用一樣也採駝峰式寫法），更多的事件處理方法可以參考[官方網站](https://reactjs.org/docs/events.html#supported-events)。

```html
<HelloMessage onClick={this.onBtn} />
```

