import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Marvels from "./components/marvels/marvels";
import Marvel from "./components/marvel/marvel";
import MainLayout from "./components/layout/MainLayout";

const router = createBrowserRouter([
  {
    element: <MainLayout />, // Wrap all routes with layout
    children: [
      { path: "/", element: <Marvels /> },
      { path: "/marvels/:id", element: <Marvel /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
