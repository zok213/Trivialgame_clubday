import "./assets/css/app.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IntroPage from "./pages/intro";
import Game from "./pages/game";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IntroPage />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
