import { useState } from 'react'
import { blog_data, blogCategories } from '../assets/assets'
import { motion } from 'motion/react'
import BlogCard from './BlogCard';
import { useAppContext } from '../context/AppContext';

const Bloglist = () => {

    // state to manage the selected menu 
    const [menu, setMenu] = useState('All');

    const { blogs, input } = useAppContext()

    const filteredBlogs = () => {
        // if no input is specified show all blogs
        if (input === '') {
            return blogs
        }

        return blogs.filter((blog) => (
            blog.title.toLowerCase().includes(input.toLowerCase()) ||
            blog.category.toLowerCase().includes(input.toLowerCase())
        ))
    }

    return (
        <div>
            <div className='flex justify-center gap-4 sm:gap-8 my-10 relative'>
                {/* categories of blog */}
                {blogCategories.map((item) => (
                    <div key={item} className='relative'>
                        {/* set current menu to selected menu and display its content */}
                        {/* only highlighted if selected */}
                        <button onClick={() => setMenu(item)} className={`relative cursor-pointer text-gray-300 ${menu === item && 'text-white px-4 pt-0.5'}`}>
                            {/* motion.div is used to animate the highlight when menu change */}
                            {menu === item && (
                                <motion.div
                                    layoutId='underline'
                                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    className='absolute left-0 right-0 top-0 h-7 bg-primary rounded-full'
                                ></motion.div>
                            )}
                            {/* display item */}
                            <p className={`relative  ${menu == item ? 'text-white font-bold' : ''}`}>{item}</p>
                        </button>
                    </div>
                ))}
            </div>
            <div className='flex flex-col gap-16 mb-24 mx-8 sm:mx-16 xl:mx-40'>
                {filteredBlogs().filter((blog) => menu === 'All' ? true : blog.category === menu)
                    .map((blog, idx) => {
                        // Extract first 15 lines from description
                        let shortDesc = blog.description;
                        if (shortDesc) {
                            // Remove HTML tags and split by line or sentence
                            const plain = shortDesc.replace(/<[^>]+>/g, '');
                            const lines = plain.split(/\n|\r|\.|\!|\?/).filter(Boolean);
                            shortDesc = lines.slice(0, 8).join('. ') + (lines.length > 8 ? '...' : '');
                        }
                        return (
                            <div
                                key={blog._id}
                                className={`flex flex-row ${idx % 2 === 0 ? 'justify-start' : 'justify-end'} items-center`}
                            >
                                {idx % 2 === 0 ? (
                                    <>
                                        <div className='w-full sm:w-2/3 md:w-1/2 flex items-center'>
                                            <BlogCard blog={blog} />
                                        </div>
                                        <div className='hidden sm:flex sm:w-1/3 md:w-1/2 px-6 items-center'>
                                            <div className='text-sm text-gray-400'>{shortDesc}</div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='hidden sm:flex sm:w-1/3 md:w-1/2 px-6 items-center'>
                                            <div className='text-sm text-gray-400'>{shortDesc}</div>
                                        </div>
                                        <div className='w-full sm:w-2/3 md:w-1/2 flex items-center'>
                                            <BlogCard blog={blog} />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
            </div>

        </div>
    )
}

export default Bloglist
