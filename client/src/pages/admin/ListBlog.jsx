import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets'
import BlogTableItems from '../../components/admin/BlogTableItems'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ListBlog = () => {

  const [blogs, setBlogs] = useState([])   

  const { axios } = useAppContext() 

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('/api/admin/blogs')

      if(data.success) {
        setBlogs(data.blogs)
      }else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // whenever this component mounts, fetch the blogs and set the blogs state
  useEffect(() => {
    fetchBlogs()
  },[])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All Blogs</h1>

      {/* blogs list */}
      <div className="max-w-4xl shadow rounded-lg scrollbar-hide relative">
        <div className="overflow-auto h-[75vh]">
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-blue-400 text-left uppercase sticky top-0  bg-black'>
              <tr>
                <th scope='col' className='px-2 py-4 w-12'>#</th>
                <th scope='col' className='px-2 py-4 w-2/5'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden w-1/5'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden w-1/5'>Status</th>
                <th scope='col' className='px-2 py-4 w-1/5'>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <BlogTableItems key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListBlog
