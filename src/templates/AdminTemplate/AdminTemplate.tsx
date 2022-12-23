import React from 'react'
import Sidebar from '../../components/Admin/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'
type Props = {}

const AdminTemplate = (props: Props) => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  )
}

export default AdminTemplate