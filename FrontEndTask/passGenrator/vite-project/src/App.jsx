import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [password, setPassword] = useState('PASSWORD');
  const [isNumber, setIsNumber] = useState(false);
  const [isSpChar, setSpChar] = useState(false);
  const [length, setLength] = useState(8);
  const passwordRef = useRef(null);

  const spCharHandler = () => {
    setSpChar((prev) => !prev);
    console.log(isSpChar);
  };

  const isNumberHandler = () => {
    setIsNumber((prev) => !prev);
    console.log(isNumber);
  };

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const rangHandler = (event) => {
    let value = event.target.value;
    setLength(value);
    console.log(value);
  };

  const genratePassword = () => {
    let pass = '';
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    isNumber ? (str += '0123456789') : '';
    isSpChar ? (str += "!@#$%^&*(?/'") : '';
    console.log(length);
    for (let i = 1; i <= length; i++) {
      const indexSelected = Math.floor(Math.random() * str.length);
      pass += str[indexSelected];
    }
    return pass;
  };

  const GenratePasswordHandler = useCallback(genratePassword, [
    isNumber,
    isSpChar,
    length,
    setPassword,
  ]);

  useEffect(() => {
    setPassword(GenratePasswordHandler());
  }, [isNumber, isSpChar, setPassword, length]);

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-md shadow-md'>
      <label
        htmlFor='passwordLength'
        className='block text-lg font-semibold text-gray-800 mb-2'
      >
        Password Length: {length}
      </label>

      <input
        type='range'
        id='passwordLength'
        name='passwordLength'
        min='6'
        max='20'
        onClick={rangHandler}
        className='w-full px-4 py-2 bg-gray-200 rounded-md'
      />

      <div className='mt-4'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='includeUppercase'
            className='mr-2 h-4 w-4 text-blue-500'
            onClick={spCharHandler}
          />
          <label htmlFor='includeUppercase' className='text-gray-800'>
            Include Special Letters
          </label>
        </div>
      </div>

      <div className='mt-2'>
        <div className='flex items-center'>
          <input
            type='checkbox'
            id='includeNumbers'
            className='mr-2 h-4 w-4 text-blue-500'
            onClick={isNumberHandler}
          />
          <label htmlFor='includeNumbers' className='text-gray-800'>
            Include Numbers
          </label>
        </div>
      </div>

      <div className='mt-6'>
        <button
          onClick={copyPasswordToClipboard}
          className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300'
        >
          Copy Password
        </button>
      </div>

      <div className='mt-4'>
        <input className='text-gray-800 text-lg' ref={passwordRef} value={password}/>
          </div>
    </div>
  );
}

export default App;
