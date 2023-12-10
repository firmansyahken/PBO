import React from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Sidebar } from '../components'
import Navbar from '../components/Navbar'

const Layout = () => {

  return (
    <>
        <Navbar/>
        <div className="container mx-auto max-w-[1200px] py-12 px-6">
            <Outlet/>
        </div>
        <Footer/>
    </>
  )
}

export default Layout