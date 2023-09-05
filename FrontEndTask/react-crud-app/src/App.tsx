import './App.css';

import { Login } from './Components/Auth/Login';
import { Register } from './Components/Auth/Register';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import { RootLayout } from './Components/RootLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='login' element={<Login />}></Route>
      <Route path='register' element={<Register />}></Route>
    </Route>
  )
);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
