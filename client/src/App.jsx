import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './components/admin/Login'
import 'quill/dist/quill.snow.css'; // Import Quill styles
import { Toaster } from 'react-hot-toast' // Import Toaster for notifications
import { useAppContext } from './context/AppContext'

const App = () => {

  const { token } = useAppContext()

  return (
    <div className='bg-black text-white'>
      <Toaster/> {/* Toaster for notifications can be used by any component */}

      <Routes>

        <Route path='/' element={<Home/>} />

        <Route path='/blog/:id' element={<Blog/>} />

        {/* check if user is logged in or logged out */}
        {/* if logged out show login form */}
        <Route path='/admin' element={ token ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}/>           {/*   /admin            */}
          <Route path='addBlog' element={<AddBlog/>}/>    {/*   /admin/addBlog    */}
          <Route path='listBlog' element={<ListBlog/>}/>  {/*   /admin/listBlog   */}
          <Route path='comments' element={<Comments/>}/>  {/*   /admin/comments   */}
        </Route>

      </Routes>
    </div>
  )
}

export default App
