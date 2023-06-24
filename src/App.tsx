import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/auth/login/Login"));
const Register = lazy(() => import("./pages/auth/register/Register"));
const ResetPassword = lazy(() => import("./pages/auth/reset/ResetPassword"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback="Loading...">
          <Home />,
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense fallback="Loading...">
          <Login />,
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense fallback="Loading...">
          <Register />,
        </Suspense>
      ),
    },
    {
      path: "/reset",
      element: (
        <Suspense fallback="Loading...">
          <ResetPassword />,
        </Suspense>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
