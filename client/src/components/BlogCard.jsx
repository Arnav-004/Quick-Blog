import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog }) => {

    // contents of the blog to be shown in this card
    const { title, description, image, category, _id } = blog;

    const navigate = useNavigate()

return (
    // display the data
    <div
        onClick={() => navigate(`/blog/${_id}`)}
        className="cursor-pointer w-full rounded-lg overflow-hidden shadow transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-[0_16px_60px_0_rgba(59,130,246,0.45)] relative z-10"
        style={{ transitionProperty: 'transform, box-shadow, z-index' }}
    >
        {/* display the blog */}
        <img src={image} alt="" className="aspect-video" />
        <span className="ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs">
            {category}
        </span>
        <div className="p-5">
            <h5 className="mb-2 font-medium text-gray-900">{title}</h5>
            <p className="mb-3 text-xs text-gray-600"  dangerouslySetInnerHTML={{"__html": description.slice(0, 80)}}></p>
        </div>
    </div>
)
}

export default BlogCard
