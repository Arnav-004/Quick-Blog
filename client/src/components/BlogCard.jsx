import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog }) => {

    // contents of the blog to be shown in this card
    const { title, description, image, category, _id } = blog;

    const navigate = useNavigate()

return (
    // display the data
    <div
        onClick={() => navigate(`/blog/${_id}`)}
        className="cursor-pointer w-full max-w-xs sm:max-w-sm md:max-w-md rounded-lg overflow-hidden shadow-lg transition-all 
        duration-300 ease-in-out hover:scale-110 hover:shadow-[0_20px_80px_0_rgba(30,41,59,0.85),0_0px_120px_0_rgba(59,130,246,0.65)] relative z-10"
        style={{ transitionProperty: 'transform, box-shadow, z-index' }}
    >
        {/* display the blog */}
        <img src={image} alt="" className="aspect-video" />
        <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">
            {category}
        </span>
    <div className="p-3">
            <h5 className="mb-2 font-medium text-white">{title}</h5>
        </div>
    </div>
)
}

export default BlogCard
