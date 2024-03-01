// index.js
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './components/Auth/Login/Login.jsx';
import { Register } from './components/Auth/Regsiter/Register.jsx'; // Correct the typo in the import
import { QueryClientProvider, QueryClient } from 'react-query';
import { Provider } from 'react-redux';
import LayoutMenu from './components/Layout.jsx';
import { store } from './components/App/store.js';
import Dashboard from './components/Dashboard/Dashboard.jsx';

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
  {
    path: '/dashboard',
    element: <Dashboard />,
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