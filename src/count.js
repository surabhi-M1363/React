import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My React App</h1>
        <p>You clicked {count} times</p>
        <button onClick={incrementCount}>Click me</button>
      </header>
    </div>
  );
}

export default App;