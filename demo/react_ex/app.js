// 使用 arrow function 來設計 Functional Component 讓 UI 設計更單純（f(D) => UI），減少副作用（side effect）
const MyComponent = (props) => (
  <div>Hello, {props.name}</div>
);

// PropTypes 驗證，若傳入的 props type 不符合將會顯示錯誤
MyComponent.propTypes = {
  name: React.PropTypes.string,
}

// Prop 預設值，若對應 props 沒傳入值將會使用 default 值
MyComponent.defaultProps = {
  name: '',
}

// 將 <MyComponent /> 元件插入 id 為 app 的 DOM 元素中
ReactDOM.render(<MyComponent name="Mark"/>, document.getElementById('app'));