import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout/>,
      children: [
        {
            path: "/",
            element: <HomePage/>
        },
        {
            path: "/calculator",
            element: 
        }
      ]
    },
  ]);

  export default Router