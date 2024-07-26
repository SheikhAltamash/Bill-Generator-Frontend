import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import './App.css'
import Form from './form'
import Home from './Home'
import { Bill } from './Bill';
import { AlllBills } from './AlllBills';

function App() {
  const [showForm, setShowForm] = useState(false);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home></Home>,
      data:"altamash"
    }, {
      path: "/form",
      element:<Form></Form>
    },
    {
      path: "/bill",
      element: <Bill></Bill>,
      
    },
    {
      path: "/all",
      element:<AlllBills></AlllBills>
    }
  ])

  return (
    <>
     <RouterProvider router={router}></RouterProvider> 

    </>
  )
}

export default App
