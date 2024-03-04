import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { Login } from './components/Auth/Login/Login.jsx';
import { Register } from './components/Auth/Register/Register.jsx';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import LayoutMenu from './components/Layout.jsx';
import { store } from './components/App/store.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Auth from './components/Auth/Auth.jsx';
import './App.css';
import './index.css';
import React from 'react';

// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = loadStripe(
//   'pk_test_51HrOiRCX6BmtIJZGzNTsZTgaAfiweCt0DaiFJZtsxtQQgXMUCLWDEuWvfpdptlZc00VYK8pSHjafNf0oBzOCYoUI00UZ93Y3lE'
// );
const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path='/'>
        <Route element={<LayoutMenu />}>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Login />} />
        </Route>
      </Route>
      <Route element={<Auth />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </React.Fragment>
  )
);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </QueryClientProvider>
);
