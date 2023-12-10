import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../layout'
import { Home, Detail, Create, Profile, Login, Register, ProfilePhoto } from '../pages'
import PrivateRoute from './PrivateRoute'
import GuestRoute from './GuestRoute'

const Routers = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/" element={<PrivateRoute><Home/></PrivateRoute>}/>
                <Route path="/detail/:id" element={<PrivateRoute><Detail/></PrivateRoute>}/>
                <Route path="/create" element={<PrivateRoute><Create/></PrivateRoute>}/>
                <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                <Route path="/profile/photo" element={<PrivateRoute><ProfilePhoto/></PrivateRoute>}/>
            </Route>
            <Route path="/login" element={<GuestRoute><Login/></GuestRoute>}/>
            <Route path="/register" element={<GuestRoute><Register/></GuestRoute>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default Routers