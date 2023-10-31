import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Apply from "./pages/Apply.jsx";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
    // {
    //   path: "/apply",
    //   element: <Apply />,
    // },
  ],
  { basename: "/customizer" }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}></RouterProvider>
);
