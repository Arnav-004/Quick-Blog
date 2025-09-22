import { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { parse, marked } from 'marked'   // to parse markdown content to HTML 

const AddBlog = () => {

  const { axios } = useAppContext()

  const[ isAdding, setIsAdding ] = useState(false)  // 
  const[ loading,  setLoading ] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(false)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('')
  const [isPublished, setIsPublished] = useState(false)

  const generateContent = async () => {
    if(!title) return toast.error("Please enter a title")

    try { 
      // Set loading to true to indicate that ai is working
      // it prevents multiple submissions
      setLoading(true)

      // sending title as prompt to ai
      // configure once (at top of file)
      marked.setOptions({
        breaks: true, // keep line breaks
        gfm: true     // GitHub-flavored markdown (lists, bold, etc.)
      });

      const { data } = await axios.post('/api/blog/generate', { prompt: title });

      if (data.success) {
        const htmlContent = marked.parse(data.content); 
        quillRef.current.clipboard.dangerouslyPasteHTML(htmlContent);
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      // Set isAdding to true to indicate that the blog is being added
      // it prevents multiple submissions
      setIsAdding(true) 
      
      const blog = {
        title, 
        subTitle,
        category,
        isPublished,
        description: quillRef.current.root.innerHTML, // Get HTML content from Quill editor
      }

      // create a FormData object to send both text and file data
      const formData = new FormData()
      formData.append('blog', JSON.stringify(blog))
      formData.append('image', image)

      const { data } = await axios.post('/api/blog/add', formData)
      
      if(data.success){
        toast.success(data.message)
        setImage(false)
        setTitle('')
        setSubTitle('')
        setIsPublished(false)
        quillRef.current.root.innerHTML = '' // Clear the Quill editor content
        setCategory('Startup')
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{              //  when finaly uploading is completed reset the isAdding state
      setIsAdding(false)
    }
  }

  useEffect(() => {
    // Initialize Quill editor only once
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {theme : 'snow'})
    }
  },[]) 

  return (
    <form onSubmit={onSubmitHandler}  className='flex-1 h-full overflow-scroll'>
      <div className=" w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded ">

        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img src={ !image ? assets.upload_area : URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer '/>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required  className='border border-gray-300 rounded p-2 w-full mb-4' />
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here'
        onChange={e => setTitle(e.target.value)} value={title} required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'/>

        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here'
        onChange={e => setSubTitle(e.target.value)} value={subTitle} required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'/>

        <p className='mt-4'>Blog description</p>
        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative">
          <div ref={editorRef}></div>
          {/* adding loading animation while ai is working */}
          { loading && ( <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2">
            <div className="w-8 h-8 rounded-full border-2 border-t-white animate-spin"></div>
          </div> )}

          {/* AI */}
          {/* button disabled while content is generating */}
          <button disabled={loading} type="button" onClick={generateContent} className='absolute bottom-1 right-2 ml-2 text-xs text-gray-300 bg-gray-800 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate with AI</button>
        </div>

        <p className='mt-4 '>Blog category</p>
        <select onChange={e => setCategory(e.target.value) } name="category" id="" className='mt-2 px-3 py-2 border text-gray-400 border-gray-300 outline-none rounded bg-black '>
          <option value=""> Select category</option>
          {blogCategories.map((category, index) => {
            return <option key={index} value={category}>{category}</option>
          })}
        </select>

        <div className='flex gap-2 mt-4 '>
          <p>Publish Now</p>
          <input type="checkbox" checked={isPublished} id="" onChange={e => setIsPublished(e.target.checked)}  className='scale-125 cursor-pointer'/>
        </div>

        {/* add blog button */}
        {/* it is disabled while the blog is being added */}
        <button disabled={isAdding} type="submit" className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
          { isAdding ? "Adding...."  :  "Add Blog" }
        </button>

      </div>
    </form>
  )
}

export default AddBlog
