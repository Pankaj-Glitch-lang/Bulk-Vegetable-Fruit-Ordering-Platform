import { useState } from 'react'

import './App.css'
import { Routes,Route } from 'react-router-dom'
import HomePage from './component/HomePage'
import OrderPage from './component/OrderPage'
import TrackOrderPage from './component/TrackOrderPage'
import Navbar from './component/Navbar'
import ProductDetails from './component/ProductDetailsPage'
import AdminDashboard from './component/AdminDashboard'
import AdminSignUp from './component/AdminSignUp'
import AdminSignIn from './component/Signin'
import ManageInventory from './component/ManageInventory'
import ManageOrders from './component/ManageOrders'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/order' element={<OrderPage/>}/>
        <Route path='/trackorder' element={<TrackOrderPage/>}/>
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/signup' element={<AdminSignUp/>}/>
        <Route path='/admin/signin' element={<AdminSignIn/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/admin/inventory' element={<ManageInventory/>}/>
        <Route path='/admin/orders' element={<ManageOrders/>}/>


        


        


        

      </Routes>

    </>
  )
}

export default App
