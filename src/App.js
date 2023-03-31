import React from 'react'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import Private from './Components/Private'
import Login from './Components/Login'
import AddProduct from './Components/AddProduct'
import Products from './Components/Products'
import Update from './Components/Update'
import { BrowserRouter, Route, Routes } from "react-router-dom"

const App = () => {
  return (
    <>
      <h1 className='project-headline'>E-Commerce Dashboard</h1>
      <BrowserRouter>
        <Navbar />
        <Routes>

          <Route element={<Private />}>
            <Route path="/" element={<Products />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<Update />} />
            <Route path="/logout" element={<h1>Logout Component</h1>} />
            <Route path="/profile" element={<h1>Profile Component</h1>} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App