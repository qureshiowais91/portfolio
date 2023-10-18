import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { All } from './compnent/all'
import {Career} from "./compnent/career";
import { Cbscb } from './compnent/cbscr';
import  {Datasc} from  './compnent/datasc';
import {FSD} from './compnent/fsd'; 
import { RootLayout } from './Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route path="all" element={<All />} />
      <Route path="career" element={<Career />} />
      <Route path="cyber_sec" element={<Cbscb />} />
      <Route path="data_sc" element={<Datasc />} />
      <Route path="fsd" element={<FSD />} />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
