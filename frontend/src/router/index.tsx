import ErrorPage from "@/pages/errors/ErrorPage";
import React, { lazy, useEffect } from "react";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import ResetPassword from "@/pages/auth/resetPassword";
import Navbar from "@/components/navbar/Navbar";
import { useAction } from "@/hooks/useAction";
import AllPosts from "@/pages/post/allPosts/allPosts";
import ReadPost from "@/pages/post/readPost/readPost";

const Root: React.FC = () => {
  const { checkAuth } = useAction();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

const AuthRouteGuard = ({ isPrivate }: { isPrivate: boolean }) => {
  let auth = { token: true };

  debugger

  const publicRedirect = "/login";
  const privateRedirect = "/post/all";

  const redirectPath = auth.token ? privateRedirect : publicRedirect;

  return auth.token === isPrivate ? <Outlet /> : <Navigate to={redirectPath} />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <AuthRouteGuard isPrivate={true} />,
        children: [
          {
            index: true,
            element: <Navigate to={"/post/all"} />,
          },
          {
            path: "/post",
            children: [
              {
                path: "/post/:id",
                element: <ReadPost />,
              },
            ],
          },
        ],
      },
      {
        element: <AuthRouteGuard isPrivate={false} />,
        children: [
          {
            index: true,
            element: <Navigate to={"/login"} />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/forgot",
            element: <ResetPassword />,
          },
          {
            path: "/register",
            element: <Register />,
          },
        ],
      },
      {
        path: "/post",
        children: [
          {
            index: true,
            element: <Navigate to="/post/all" replace />,
          },
          {
            path: "/post/all",
            element: <AllPosts />,
          },
        ],
      },
    ],
  },
]);

const Router: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default Router;
