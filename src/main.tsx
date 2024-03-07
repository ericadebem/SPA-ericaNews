import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar.tsx";
import { Home }  from "./pages/Home/Home.tsx";
import { Search } from "./pages/Search/Search.tsx";
import { GlobalStyled } from "./GlobalStyled.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import { Authentication } from "./pages/Authentication/Authentication.tsx";
import { Profile } from "./pages/Profile/Profile.tsx";
import UserProvider from "./Context/UserContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search/:title",
        element: <Search />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Authentication />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyled />
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);