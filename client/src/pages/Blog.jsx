import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, blog_data, comments_data } from '../assets/assets'
import Navbar from '../components/Navbar'
import Moment from 'moment'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const Blog = () => {

  const { axios } = useAppContext()

  const { id } = useParams()  // id passed in parameters id of the required/ selected blog

  const [ data , setData ] = useState(null)  // blog data
  const [ comments , setComments ] = useState([])  // blog comments
  
  // for added comments
  const [ name , setName ] = useState("")  // name of user commenting
  const [ content, setContent ] = useState([])  // comment of the user




  // this function must be called once on component mount
  const fetchBlogData = async () => {  
    try {
      const { data } = await axios.get(`/api/blog/${id}`)
      
      // set data to required data
      data.success ? setData(data.blog) : toast.error(data.message)
    
    } catch (error) {
      toast.error(error.message)
    }
  }




  // this function must be called once on component mount
  const fetchComments = async () => {
    try {
      const { data } = await axios.post('/api/blog/comments', {blogId: id})
      
      // set comments to comments for this blog
      data.success ? setComments(data.comments) : toast.error(data.message)
    }catch (error) {
      toast.error(error.message)
    }
  }

  // useEffect to call fetchBlogData once on component mount
  useEffect(()=> {
    fetchBlogData()
    fetchComments()
    window.scrollTo(0, 0)  // scroll to top when blog is loaded
  },[])




  // function to add comment
  const addComment = async (e) => {
    e.preventDefault()
    try{
      const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content })

      if(data.success){
        toast.success(data.message)
        setName('')
        setContent('')
      }else{
        toast.error(data.message)
      }
    }catch(error) {
      toast.error(error.message)
    }
  }



  // if data is selected it is shown else loding is shown
  return data ? (
    <div className='relative'>

      <Navbar/>

      {/* top part of blog */}
      <div className='text-center mt-20 text-gray-400'>
        {/* use moment package to display date in required format */}
        <p className='text-primary py-4 font-medium'>Published on {Moment(data.createdAt).format('MMMM Do YYYY')}</p>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-white'> {data.title} </h1>
        <h2 className='my-5 max-w-lg truncate mx-auto'> {data.subTitle} </h2>
        <h2 className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'> Ardigimbo Drikatlos </h2>
      </div>


      {/* main blog data */}
      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
        {/* blog image */}
        <img src={data.image} alt="" className='rounded-3xl mb-5'/>

        {/* blog description */}
        {/* rich-text is custom css defined in index.css */}
        <div className=' rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}></div>

        {/* Comments Section */}
        <div className='mt-40 mb-10 max-w-3xl mx-auto text-gray-300'>
          <p className='font-semibold mb-4'>Comments ({comments.length}) </p>
          <div className='flex flex-col gap-4'>
            {comments.map((comment, index) => (
              <div key={index} className=' relative bg-gray-950 border border-primary/40 max-w-xl p-4 rounded text-gray-300'>
                <div className='flex items-center gap-2 mb-2'>
                  <img src={assets.user_icon} alt="" className='w-6'/>
                  <p className='font-medium'>{comment.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{comment.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{Moment(comment.createdAt).fromNow()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Comment Form */}
        <div className='max-w-3xl mx-auto text-gray-300'>
          <p className='font-semibold mb-4'>Add your comment</p>
          {/* form */}
          <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg' >
            {/* input user name */}
            <input onChange={(e) => setName(e.target.value)} value={name}
             type="text" placeholder='Name' required  className='w-full p-2 border border-gray-300 rounded outline-none text-white'  />
            
            {/* write comment */}
            <textarea onChange={(e) => setContent(e.target.value)} value={content}
             placeholder='Comment' required   className='w-full p-2 border border-gray-300 outline-none h-48 text-white'  ></textarea>
            
            <button type='submit' className='bg-primary text-white p-2 px-8 rounded hover:scale-102 transition-all cursor-pointer'>Submit</button>
          </form>
        </div>

        {/* share buttons */}
        <div className='my-24 max-w-3xl mx-auto'>
          <p className='font-semibold my-4 text-gray-500'>Share this article on social media</p>
          <div className='flex'>
            <img src={assets.facebook_icon} width={50} alt="" className='cursor-pointer hover:bg-primary/10 rounded-full hover:scale-140'/>
            <img src={assets.twitter_icon} width={50} alt="" className='cursor-pointer hover:bg-primary/10 rounded-full hover:scale-140'/>
            <img src={assets.googleplus_icon} width={50} alt="" className='cursor-pointer hover:bg-primary/10 rounded-full hover:scale-140'/>
          </div>
        </div>

      </div>

      <Footer/>
    </div>
  ) : <Loader/>
}

export default Blog
