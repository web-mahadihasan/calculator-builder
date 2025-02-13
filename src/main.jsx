import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import './index.css'
import { RouterProvider } from "react-router"
import Router from "./router/Router"

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={Router}/>
)
