import React from 'react'
import Header from '../Header'
import Sidebar from '../instructor/Sidebar'
import { Outlet } from 'react-router'
import Footer from '../Footer'

const StudentUI = () => {
  return (
    <div className='flex flex-col'>
        <Header />
        <div className='flex'>
            <Sidebar />
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default StudentUI
