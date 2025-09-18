import React, { useEffect, useState } from 'react'
import CommentTableItems from '../../components/admin/CommentTableItems'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Comments = () => {

  const { axios } = useAppContext()

  const [ comments, setComments ] = useState([])
  const [ filter, setFilter ] = useState('Not Approved')  // Approved or Not Approved

   const fetchComments = async () => {
      try {
        const { data } = await axios.get('/api/admin/comments')
        
        data.success ? setComments(data.comments) : toast.error(data.message)
      } catch (error) {
        toast.error(error.message)
      }
    }
  
    // whenever this component mounts, fetch the Comments and set the Comments state
    useEffect(() => {
      fetchComments()
    },[])

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 '>
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className="flex gap-4">
          <button onClick={() => setFilter('Approved')} className={`shadow-custom-sm border font-bold rounded-full px-4 py-4 cursor-pointer text-xs ${filter === 'Approved' ? 'text-primary bg-blue-300' : 'text-gray-300' }`}> Approved </button>
          <button onClick={() => setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full font-bold px-4 py-4 cursor-pointer text-xs ${filter === 'Not Approved' ? 'text-primary bg-blue-300' : 'text-gray-300' }`}> Not Approved </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl mt-4 shadow rounded-lg scrollbar-hidden">
        <div className="max-h-[60vh] overflow-y-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-md font-bold text-blue-400 text-left uppercase sticky top-0 bg-black z-10">
              <tr>
                <th scope='col' className='px-6 py-3'>Blog Title & Comment</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden' >Date</th>
                <th scope='col' className='px-2 py-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.filter((comment) => {
                if(filter === 'Approved') return comment.isApproved === true
                return comment.isApproved === false
              }).map((comment, index) => (
                <CommentTableItems key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Comments
