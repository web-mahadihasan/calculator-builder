import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import CalculatorPage from "../pages/CalculatorPage";

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
            element: <CalculatorPage/>
        }
      ]
    },
  ]);

  export default Router