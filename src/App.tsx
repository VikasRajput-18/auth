import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import Register from "./pages/auth/register/Register";
import ResetPassword from "./pages/auth/reset/ResetPassword";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/reset",
      element: <ResetPassword />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
