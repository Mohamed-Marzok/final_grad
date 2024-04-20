import React from 'react'
import { Outlet } from 'react-router';

const CourseContent = () => {
  return (
    <div>
      {<Outlet />}
    </div>
  )
}

export default CourseContent
