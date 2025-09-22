import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext';
import toast from "react-hot-toast"

const Login = () => {

  const { axios, setToken } = useAppContext()
  const { type } = useAppContext()

  const [email, setEmail] = useState('');
  const [username, setName] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const signin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    try {
      let data;
      if(type === "Login") {
        const response = await axios.post("/api/admin/login", { email, password });
        data = response.data;
      } else {
        const response = await axios.post("/api/admin/signup", { username, email, password });
        data = response.data;
      }

      if(data.success){
        setSuccessMsg(data.message || "Login successful.");
        // set token in context
        setToken(data.token);
        localStorage.setItem('token', data.token);
        axios.defaults.headers.common['Authorization'] = data.token;
      } else {
        setErrorMsg(data.message || "Something went wrong.");
      }
    } catch(error) {
      setErrorMsg(error.response?.data?.message || error.message || "Network error.");
    }
  }

  return (
    <div className='flex items-center justify-center h-screen text-white'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-2xl shadow-primary rounded-lg'>
        <div className='flex flex-col items-center justify-center gap-4'>

          {/* text of login */}
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'> <span className='text-primary'>{type}</span> </h1>
            <p className='font-light text-gray-400 pt-2.5'>
            {type=="Login" ? "Enter your credentials to access admin panel" : "Create an account and start writing blogs!"}
            </p>
          </div>

          {/* input form for login */}
          <form onSubmit={signin} className='mt-6 w-full sm:max-w-md text-gray-400'>
            {type === "SignUp" && <>
              <div> Username </div>
              <input onChange={(e) => setName(e.target.value)} value={username} 
              type="text" placeholder='Username' className='w-full border-b-2 border-gray-300 p-2 outline-none mb-6 text-white'/>
            </>
            }
            <div> Email Id </div>
            <input onChange={(e) => setEmail(e.target.value)} value={email} 
            type="email" placeholder='Email_Id' className='w-full border-b-2 border-gray-300 p-2 outline-none mb-6 text-white'/>
            
            <div> Password </div>
            <input onChange={(e) => setPassword(e.target.value)} value={password}  
            type="password" placeholder='Password' className='w-full border-b-2 border-gray-300 p-2 outline-none mb-6 text-white '/>

            <button type="submit" className='w-full rounded mt-3.5 py-3 text-white font-medium cursor-pointer bg-primary hover:bg-primary/90 hover:scale-103 transition-all'>{type}</button>
            {errorMsg && <div className="mt-4 text-red-500 text-center text-sm font-medium">{errorMsg}</div>}
            {successMsg && <div className="mt-4 text-green-500 text-center text-sm font-medium">{successMsg}</div>}
          </form>


        </div>
      </div>
    </div>
  )
}

export default Login
