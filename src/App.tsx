
import {
  createBrowserRouter,
  RouterProvider,

} from "react-router-dom";
import Login from "./pages/auth/login/Login";
import Home from "./pages/home/Home";
import Register from "./pages/auth/register/Register";


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
  ]);



  return <RouterProvider router={router} />;
};

export default App;
