import React from 'react';
import Counter from './Counter'; // Assuming the Counter component file is in the same directory

class App extends React.Component {
  render() {
    return ( // Don't forget to use the return statement
      <div>
        <h1>My Counter App</h1>
        <Counter />
      </div>
    );
  }
}

export default App;
