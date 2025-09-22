import React, { useRef } from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Header = () => {

    const { setInput, input } = useAppContext()
    const inputRef = useRef()

    const onSubmitHandler = (e) => {
        e.preventDefault()
        setInput(inputRef.current.value) // set the input value to the context
    }

    const onClear = () => {
        setInput('')
        inputRef.current.value = "" // clear the input field
    }

  return (
    <div className='mx-8 sm:mx-16 xl:mx-24 relative'>
        <div className='text-center mt-20 mb-8'>
            <div className="inline-flex items-center gap-3 px-7 py-2 mb-6 border-2 border-primary shadow-lg rounded-full text-base font-semibold text-primary animate-bounce">
                <img src={assets.star_icon} alt="AI" className="w-4 h-4" />
                <span>✨ New: AI feature integrated</span>
            </div>

            <h1 className='text-3xl sm:text-6xl font-semibold sm:leading-16'>
                Your own <span className='text-primary'>blogging</span> <br /> platform.
            </h1>

            <p className='my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-500'>
                Create a blog in minutes with our easy-to-use platform. <br />
                Customize your blog, write posts, and share your thoughts with the world.
            </p>

            {/* create home page form */}
            <form onSubmit={onSubmitHandler} className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-primary/40 bg-gray-800/80 overflow-hidden rounded-2xl shadow-lg">
                <input ref={inputRef} type="text" placeholder="Search for blogs" required className="w-full pl-4 outline-none text-white bg-transparent placeholder-gray-400" />
                <button type="submit" className="bg-primary text-white px-8 py-2 m-1.5 rounded-2xl hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer font-semibold shadow">Search</button>
            </form>
        </div>

        {/* clear search button */}
        <div className="text-center">
            {input && <button onClick={onClear} className="border border-primary/40 bg-gray-900/80 text-primary font-light text-xs py-1 px-3 rounded-full shadow-custom-sm cursor-pointer hover:bg-primary/10 transition-all">Clear Search</button>}
        </div>

        {/* home me bg img */}
        {/* <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50 '/> */}
    </div>
  )
}

export default Header
