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
        if(input === ''){
            return blogs
        }
        
        return blogs.filter((blog) => (
            blog.title.toLowerCase().includes(input.toLowerCase())  ||
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
                    <button onClick={()=>setMenu(item)}  className={`cursor-pointer text-gray-500 ${menu === item && 'text-white px-4 pt-0.5'}`}>
                        {/* display item */}
                        {item}
                        {/* motion.div is used to animate the highlight when menu change */}
                        {menu === item && (
                            <motion.div layoutId='underline' 
                            transition={{type:'spring', stiffness: 500, damping: 30}} 
                            className='absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full'></motion.div>
                        )}
                    </button>
                </div>
            ))}
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40 '>
            {/* if all is selected all data is selected
                else only blog whith category = current menu is selected 
                .map   for all selected blog it send data to card and display the card*/}
            {filteredBlogs().filter((blog)=> menu === 'All' ? true : blog.category === menu)
            .map((blog) => <BlogCard key={blog._id} blog={blog}/>)}
        </div>

    </div>
  )
}

export default Bloglist
