import React from 'react';

class Counter extends React.Component {
  state = {
    count: 0,
  };

  increment = () => {
    this.setState((prevState) => {
      prevState.count = prevState.count + 1;
      return prevState;
    });
  };

  decrement = () => {
    this.setState((prevState) => {
      prevState.count = prevState.count - 1;
      return prevState;
    });
  };

  render() {
    return (
      <div>
        <h1>Counter</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    );
  }
}

export default Counter;
