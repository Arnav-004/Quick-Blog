import { useEffect, useState } from 'react'
import BlogTableItems from '../../components/admin/BlogTableItems'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assets.js'
import Noblog from '../../components/admin/Noblog.jsx'

const Dashboard = () => {

  const { axios, display, setdisplay } = useAppContext()

  const [ dashboardData, setDashboardData ] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  // fetch dashboard data from the server
  const fetchDashboardData = async () => {
    try {
      // Send user id in request (as query param or header)
      const { data } = await axios.get('/api/admin/dashboard');

      if(data.success){
        if(data.dashboardData.blogs === 0 && display != 0) {
          setdisplay(0)
        }
        else if(data.dashboardData.blogs != 0 && display == 0) {
          setdisplay(1)
        }
        setDashboardData(data.dashboardData)
      }
      else  toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  // fetch dashboardData on component mount
  useEffect(() => {
    fetchDashboardData()
  }, [])

  return (
    display == 0 ? <Noblog/> :
    <div className='flex-1 p-4 md:p-10'>

      {/* top cards of dashboard */}
      <div className='flex flex-wrap gap-4'>
        <div className='flex items-center gap-4 bg-black p-4 rounded-lg shadow-lg min-w-58 hover:scale-110 hover:shadow-[0_0_20px_0_rgba(59,130,246,0.7)] transition-all cursor-pointer'>
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className='text-xl font-semibold text-white'>{dashboardData.blogs}</p>
            <p className='text-gray-400 font-light'>Blogs</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-black p-4 rounded-lg shadow-lg min-w-58 hover:scale-110 hover:shadow-[0_0_20px_0_rgba(59,130,246,0.7)] transition-all cursor-pointer'>
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className='text-xl font-semibold text-white'>{dashboardData.comments}</p>
            <p className='text-gray-400 font-light'>Comments</p>
          </div>
        </div>

        <div className='flex items-center gap-4 bg-black p-4 rounded-lg shadow-lg min-w-58 hover:scale-110 hover:shadow-[0_0_20px_0_rgba(59,130,246,0.7)] transition-all cursor-pointer'>
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className='text-xl font-semibold text-white'>{dashboardData.drafts}</p>
            <p className='text-gray-400 font-light'>Drafts</p>
          </div>
        </div>
      </div>
      
      
      {/* list in the dashboard */}
      <div className="">
        {/* heading */}
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-500">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        {/* blogs list */}
        <div className="relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide ">
          {/* showing blogs in table format */}
          <table className='w-full text-sm text-gray-400'>
            <thead className='textxs text-blue-400 text-left uppercase'>
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
