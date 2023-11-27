import './App.css';
import React, { useState } from 'react';

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleButtonClick = (color) => {
    setBackgroundColor(color);
  };

  return (
    <div style={{ backgroundColor: backgroundColor, minHeight: '100vh' }}>
      <button
        onClick={() => handleButtonClick('red')}
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
      >
        Red Button
      </button>
      <button
        onClick={() => handleButtonClick('green')}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Green Button
      </button>
      <button
        onClick={() => handleButtonClick('blue')}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Blue Button
      </button>
    </div>
  );
}
export default App;
