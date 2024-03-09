import React from 'react'
import Header from '../Header'
import Sidebar from '../instructor/Sidebar'

const CreateAssignment = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex justify-center items-center'>
        <Sidebar />
        <div className='w-3/4 h-screen'>
            <h1>Assignments</h1>
        </div>
      </div>
    </div>
  )
}

export default CreateAssignment
