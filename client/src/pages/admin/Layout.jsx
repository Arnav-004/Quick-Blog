import React from 'react'
import { assets } from '../../assets/assets'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'
import { useAppContext } from '../../context/AppContext'

const Layout = () => {

  const { axios, setToken, navigate } = useAppContext()

  const logout = () => {
    // remove token from localStorage
    localStorage.removeItem('token')

    // remove authorization (token) from axios headers
    axios.defaults.headers.common['Authorization'] = null

    // set token state to null
    setToken(null)

    // redirect to home page
    navigate('/')
  }

  return (
    <>
      {/* top bar for admin */}
      <div className='flex items-center justify-between py-2 h-[70px] px-4 sm:px-12 border-b border-gray-200 shadow-md'>
        <img src={assets.logo} onClick={()=> navigate('/')} alt=""  className='w-32 sm:w-40 cursor-pointer'/>
        <button onClick={logout} 
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-gradient-to-r from-amber-400 to-orange-500 text-white px-8 py-2 shadow-lg hover:scale-105 transition-transform duration-200">Logout</button>
      </div>

      {/* main content area */}
      <div className='flex h-[calc(100vh-70px)]'>
        {/* sidebar for admin */}
        <Sidebar/>
        
        {/* displays the sub route of layout */}
        <Outlet />
      </div>
    </>
  )
}

export default Layout
