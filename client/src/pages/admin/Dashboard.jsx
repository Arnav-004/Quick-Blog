import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableItems from '../../components/admin/BlogTableItems'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const { axios } = useAppContext()

  const [ dashboardData, setDashboardData ] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  // fetch dashboard data from the server
  const fetchDashboardData = async () => {
    try{
      const { data } = await axios.get('/api/admin/dashboard')
      
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
    }catch (error) {
      toast.error(error.message)
    }
  }

  // fetch dashboardData on component mount
  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>

      {/* top cards of dashboard */}
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg min-w-58 hover:scale-110 hover:shadow-primary/50 transition-all cursor-pointer'>
          <img src={assets.dashboard_icon_1} alt="" />
          <div className="">
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg min-w-58 hover:scale-110 hover:shadow-primary/50 transition-all cursor-pointer'>
          <img src={assets.dashboard_icon_2} alt="" />
          <div className="">
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-white p-4 rounded-lg shadow-lg min-w-58 hover:scale-110 hover:shadow-primary/50 transition-all cursor-pointer'>
          <img src={assets.dashboard_icon_3} alt="" />
          <div className="">
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>

      {/* list in the dashboard */}
      <div className="">
        {/* heading */}
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        {/* blogs list */}
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          {/* showing blogs in table format */}
          <table className='w-full text-sm text-gray-500'>
            <thead className='textxs text-gray-600 text-left uppercase'>
              <tr>
                <th scope='col' className='px-2 py-4'>#</th>
                <th scope='col' className='px-2 py-4'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden '>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden' >Status</th>
                <th scope='col' className='px-2 py-4'>Action</th>
              </tr>
            </thead>

            <tbody>
              {dashboardData.recentBlogs.map((blog, index) => {
                  return <BlogTableItems key={blog._id} blog={blog} fetchBlogs={fetchDashboardData} index={index + 1} />
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
