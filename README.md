# React Context Wrap

Thin wrapper over the React Context API to allow for easier to manage central state and mutation actions

## Installing

```
npm install https://github.com/paulmathis/react-context-wrap.git
```

## Example

### store.js

```javascript
import createStore from 'react-context-wrap';

const config = {
  initialState: {
    count: 0
  },
  actionsCreators: {
    incrementCounter: state => ({
      ...state,
      count: state.count + 1
    })
  }
};

export const { Provider, withContext } = createStore(config);
```

### app.js

```javascript
import { Provider, withContext } from './store';

const Counter = props => (
  <div>
    Count: {props.state.count}
    <button onClick={props.actions.incrementCounter}>Increment</button>
  </div>
);

const CounterWrapper = withContext(Counter);

export default () => (
  <Provider>
    <CounterWrapper />
  </Provider>
);
```
