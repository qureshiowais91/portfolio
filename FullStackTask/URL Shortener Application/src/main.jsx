import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SendLink } from './components/SendResetLink.jsx';
import { Login } from './components/Login.jsx';
import { Register } from './components/Register.jsx';
import { ResetPassword } from './components/ResetPassword.jsx';
import { QueryClientProvider, QueryClient } from 'react-query';
import LayoutMenu from './components/Layout.jsx';

import './App.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMenu />,
    children: [
      {
        path: '/sendLink',
        element: <SendLink />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/resetPassword/:token',
        element: <ResetPassword />
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}></RouterProvider>
  </QueryClientProvider>
);
