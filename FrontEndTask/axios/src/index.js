import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Read } from "./components/Read";
import { Create } from './components/Create';
import { Update } from './components/Update';
import { Delete } from './components/Delete';
import DataProvider from './context/DataProvider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Read />
      },
      {
        path: '/Create',
        element: <Create />
      },
      {
        path: '/Update',
        element: <Update />
      }, {
        path: '/Delete',
        element: <Delete />
      }
    ],
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataProvider>
       <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);