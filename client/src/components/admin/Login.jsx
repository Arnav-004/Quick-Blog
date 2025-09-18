import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';

const Login = () => {

  const { axios, setToken } = useAppContext()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post("/api/admin/login", { email, password })

      if(data.success){
        // set token in context
        setToken(data.token)   

        // set the token in local storage
        localStorage.setItem('token', data.token)

        // set the token in axios default authorization header
        axios.defaults.headers.common['Authorization'] = data.token

      }else {
        toast.error(data.message)
      }
    }catch(error) {
      toast.error(error.message)
    }
  }

  return (
    <div className='flex items-center justify-center h-screen text-white'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-2xl shadow-primary rounded-lg'>
        <div className='flex flex-col items-center justify-center gap-4'>

          {/* text of login */}
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'> <span className='text-primary'>Login</span> </h1>
            <p className='font-light text-gray-400'>Enter your credentials to write blogs</p>
          </div>

          {/* input form for login */}
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-400'>
            <div> Email </div>
            <input onChange={(e) => setEmail(e.target.value)} value={email} 
            type="email" placeholder='Email_Id' className='w-full border-b-2 border-gray-300 p-2 outline-none mb-6 text-white'/>
            
            <div> Password </div>
            <input onChange={(e) => setPassword(e.target.value)} value={password}  
            type="password" placeholder='Password' className='w-full border-b-2 border-gray-300 p-2 outline-none mb-6 text-white '/>

            <button type="submit" className='w-full rounded py-3 text-white font-medium cursor-pointer bg-primary hover:bg-primary/90 hover:scale-103 transition-all'>Login</button>
          </form>


        </div>
      </div>
    </div>
  )
}

export default Login
