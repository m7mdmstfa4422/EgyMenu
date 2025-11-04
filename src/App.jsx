"use client"

import { useState } from "react"
import "./App.css"
import {createHashRouter , RouterProvider } from "react-router-dom"
import Home from "./components/Home/Home"
import Layout from "./components/Layout/Layout"
import StartApp from "./components/StartApp/StartApp"
import Coffe from "./components/Coffe/Coffe"
import Peef from "./components/Peef/Peef"
import Chicken from "./components/Chicken/Chicken"
import Dessert from "./components/Dessert/Dessert"
import Drink from "./components/Drink/Drink"
import Loading from "./components/Loding/Loding"
import ProductDetail from "./components/ProductDetail/ProductDetail"
import Favorites from "./components/Favorites/Favorites"
import Search from "./components/Search/Search"
import Profile from "./components/Profile/Profile"

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <StartApp />,
      },
      {
        path: "/Home",
        element: <Home />,
        children: [
          { path: "Coffee", element: <Coffe /> },
          { path: "Beef", element: <Peef /> },
          { path: "Chicken", element: <Chicken /> },
          { path: "Drink", element: <Drink /> },
          { path: "Dessert", element: <Dessert /> },
        ],
      },
      { path: "Loading", element: <Loading /> },
      { path: "/product/:id", element: <ProductDetail /> },
      { path: "/Favorites", element: <Favorites /> },
      { path: "/Search", element: <Search /> },
      { path: "/Profile", element: <Profile /> },
    ],
  },
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
