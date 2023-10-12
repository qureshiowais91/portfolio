import { CssBaseline, ThemeProvider } from '@mui/material';
import { Navbar } from './components/navbar';
import './App.css';
import { useState } from 'react';
import { ThemeController } from './components/theme/themeController';
import { lightTheme } from './components/theme/ligthTheme';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { About } from './components/Home/About';
import { Project } from './components/Home/Project';
import { Footer } from './components/footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className='App d-flex  align-items-center'>
          <Navbar />
          <div className='container '>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/project' element={<Project />} />
              <Route path='/aboutme' element={<About />} />
            </Routes>
            <ThemeController setTheme={setTheme} theme={theme} />
          </div>
        </div>
        <Footer className='footer' />
      </ThemeProvider>
    </Router>
  );
}

export default App;
