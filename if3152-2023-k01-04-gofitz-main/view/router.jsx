import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Ketersediaan from "./src/pages/Ketersediaan";
import Reservasi from "./src/pages/Reservasi"

const router = createBrowserRouter([
    {
      path: "/",
      element: <Ketersediaan />
    },
    {
        path: "/reservasi",
        element: <Reservasi  />
    }
  ]);

module.exports = { router };