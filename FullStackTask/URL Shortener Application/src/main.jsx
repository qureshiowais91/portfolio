import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './components/Authentication/Login.jsx';
import { Register } from './components/Authentication/Register.jsx';
import { QueryClientProvider, QueryClient } from 'react-query';
import LayoutMenu from './components/Layout.jsx';
import { Forgotpassword } from './components/Authentication/ForgotPassword.jsx';
import { Dashboard } from './components/Dashboard/Dashboard.jsx';
import { UserProfilePage } from './components/User/User.jsx';

import { URLShortener } from './components/Dashboard/URLShortenerForm.jsx';
import { URLTable } from './components/Dashboard/URLTable.jsx';
import { ResetToken } from './components/Authentication/ResetToken.jsx';

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
      {
        path: '/forgotpassword',
        element: <Forgotpassword />,
      },
      {
        path:'/resetPassword',
        element:<ResetToken/>
      }
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      {
        path: '/dashboard/profile',
        element: <UserProfilePage />,
      },
      {
        path: '/dashboard',
        element: <URLShortener />,
      },
      {
        path: '/dashboard/urllist',
        element: <URLTable />,
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
