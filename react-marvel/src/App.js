import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Marvels from "./components/marvels/marvels";
import Marvel from "./components/marvel/marvel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Marvels />
  },
  {
    path:"/marvels/:id",
    element:<Marvel/>
  }
])

function App() {
  return (
    <RouterProvider router={router} id='marvels' />
  );
}

export default App;
