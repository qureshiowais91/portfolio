import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux'; // Correct import for Provider
import LayoutMenu from './components/Layout.jsx';
import { store } from './App/store.js';

import './App.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMenu />,
    children: [
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/',
        element: <Login />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </QueryClientProvider>
);
