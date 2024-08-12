import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Header from "./components/header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Admin from "./components/Admin";
import Home from "./components/Home";


const root = ReactDOM.createRoot(document.getElementById("root"));
const AppLayout = () => {
  return (
    <React.StrictMode>
      <Header />
      <Outlet />
    </React.StrictMode>
  );
};

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      {
        path: "/quiz",
        element: <App />,
      },
    ],
  },
]);
root.render(<RouterProvider router={AppRoutes} />);
