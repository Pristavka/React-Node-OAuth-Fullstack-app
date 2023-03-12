import { RouterProvider } from 'react-router-dom';
import { Routes } from './Routes';
import "./App.css";

const App = () => {
  return (
    <div className="page-container">
      <RouterProvider router={Routes} />
    </div>
  );
}

export default App;
