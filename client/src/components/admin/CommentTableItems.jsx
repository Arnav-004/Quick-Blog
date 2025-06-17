import React from 'react';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const CommentTableItems = ({comment, fetchComments}) => {

    const { axios } = useAppContext()

    const {blog, createdAt, _id} = comment;
    const BlogDate = new Date(createdAt).toLocaleDateString()

    const approveComment = async () => {
        try{
            const { data } = await axios.post('/api/admin/approve-comments', {id: _id})

            if(data.success){
                toast.success(data.message)
                fetchComments()  // refetch comments after approval
            }else {
                toast.error(data.message)
            }
        }catch (error) {
            toast.error(error.message)
        }
    }

    const deleteComment = async () => {
        try{
            // confirmation before deleting the comment
            const confirm = window.confirm("Are you sure that you want to delete this comment ?")
            if(!confirm) return  // reject delete request

            const { data } = await axios.post('/api/admin/delete-comments', {id: _id})

            if(data.success){
                toast.success(data.message)
                fetchComments()  // refetch comments after approval
            }else {
                toast.error(data.message)
            }
        }catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <tr className='border-y border-gray-300'>
            {/* <th className='px-2 py-4'> { index } </th> */}
            <td className='px-6 py-4'> 
                <b className='font-medium text-gray-600'>Blog</b> : { blog.title }
                <br /> <br />
                <b className='font-medium text-gray-600'>Name</b> : { comment.name }
                <br /> <br />
                <b className='font-medium text-gray-600'>Comment</b> : { comment.content }
            </td>

            <td className='px-6 py-4 max-sm:hidden'>
                {BlogDate}
            </td>

            <td className='px-6 py-4'>
                <div className="inline-flex items-center gap-4">
                    {/* approve / unapprove icon */}
                    {!comment.isApproved  ? 
                    <img onClick={approveComment} src={assets.tick_icon} alt="" className='w-5 hover:scale-110 transition-all cursor-pointer'/>   :   <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>Approved</p> }

                    {/* delete icon */}
                    <img onClick={deleteComment}  src={assets.bin_icon} alt="" className='w-5 hover:scale-110 transition-all cursor-pointer'/>
                </div>
            </td>
        </tr>
    )
}

export default CommentTableItems
