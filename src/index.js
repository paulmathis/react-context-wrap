import React, { Component } from 'react';

export default function createStore(config) {
  const Context = React.createContext({});

  function createActions(actionsCreators, updateState) {
    const keys = Object.keys(actionsCreators);
    const actions = {};
    keys.forEach(key => {
      actions[key] = input => {
        updateState(state => actionsCreators[key](state, input));
      };
    });
    return actions;
  }

  class Provider extends Component {
    constructor(props) {
      super(props);

      this.state = config.initialState;

      this.actions = createActions(config.actionsCreators, this.updateState);
    }

    updateState = action => {
      const newState = action(this.state);
      this.setState(newState);
    };

    render() {
      return (
        <Context.Provider value={{ state: this.state, actions: this.actions }}>
          {this.props.children}
        </Context.Provider>
      );
    }
  }

  const withContext = WrappedComponent => props => (
    <Context.Consumer>
      {({ state, actions }) => <WrappedComponent {...props} state={state} actions={actions} />}
    </Context.Consumer>
  );
  return { Provider, withContext };
}
