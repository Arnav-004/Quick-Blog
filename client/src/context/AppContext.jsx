import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"

// Set the base URL for all axios requests 
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL 

const AppContext = createContext()

export const AppProvider = ({ children }) => {

    const navigate = useNavigate()

    const [ token, setToken ] = useState(null)
    const [ blogs, setBlogs ] = useState([])
    const [ input, setInput ] = useState("")
    const [ type,  setType  ] = useState("Login")
    const [ display,   setdisplay   ] = useState(0) // 0 -> no blog no comment, 1 -> blog no comment, 2 -> blog and comment

    const fetchBlogs = async () => {
        try{
            // fetch all blogs from the API
            const { data } = await axios.get('/api/blog/all')
            
            data.success ? setBlogs(data.blogs) : toast.error(data.message)

        }catch(error) {
            toast.error(error.message)
        }
    } 

    useEffect(() => {
        fetchBlogs() // Fetch blogs when the component mounts

        // Check if token exists in localStorage and set it
        const token = localStorage.getItem('token')
        if(token) {
            setToken(token)
            // as only admin undergoes authentication we can set it as default token
            axios.defaults.headers.common['Authorization'] = `${token}`
        }
    },[])

    const value = {
        axios,
        navigate,
        token,
        setToken,
        blogs,
        setBlogs,
        input,
        setInput,
        type,
        setType,
        display,
        setdisplay,
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    return useContext(AppContext)
}