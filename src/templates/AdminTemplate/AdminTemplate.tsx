import React from 'react'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
import './adminTemplate.css'
type Props = {}

const AdminTemplate = (props: Props) => {
  return (
    <>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <Outlet />

        </div>
      </div>
    </>
  )
}

export default AdminTemplate