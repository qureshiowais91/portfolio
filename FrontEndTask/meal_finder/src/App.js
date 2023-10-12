import './App.css';
import ThemeContextProvider from './contexts/ThemeContext';
import ThemeTesterClass from './components/ThemeTesterClass';
import ToggleTheme from './components/ToggleTheme';
function App() {
  return (
    <div className='App'>
      <ThemeContextProvider>
        <ThemeTesterClass>

        </ThemeTesterClass>
        <ToggleTheme></ToggleTheme>
      </ThemeContextProvider>
    </div>
  );
}

export default App;
