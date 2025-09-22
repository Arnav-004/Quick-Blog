import { assets } from "../../assets/assets"
import { NavLink } from "react-router-dom"

const Noblog = () => {
  return (
  <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
    <img src={assets.blog_icon} alt="No blogs" className="w-24 mb-6 opacity-70" />
    <p className="text-2xl text-gray-600 font-semibold mb-2">No blogs written yet!</p>
    <p className="text-base text-gray-400 mb-4">Start by writing your first blog to see it here.</p>
    <NavLink
      to="/admin/addBlog"
      className="bg-primary text-white cursor-pointer px-8 py-3 rounded-full shadow hover:bg-primary/80 transition text-center text-lg font-semibold"
    >
      Write Your First Blog
    </NavLink>
  </div>
  )
}

export default Noblog


export const NoComment = () => {
return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
        <img src={assets.comment_icon} alt="No comments" className="w-24 mb-6 opacity-70" />
        <p className="text-2xl text-gray-600 font-semibold mb-2">No comments yet!</p>
        <p className="text-base text-gray-400 mb-4">Comments will appear here once added to your blogs.</p>
    </div>
)
}
