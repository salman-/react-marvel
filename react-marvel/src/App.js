import { createBrowserRouter, RouterProvider } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Marvels from "./components/marvels/marvels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Marvels />
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
