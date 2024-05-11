import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../context/Data/myContext'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';

function Login() {
  const context = useContext(myContext)
  const { loading , setLoading} = context;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signin = async () => {
    setLoading(true)
    try {
      const result =   await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem('user',JSON.stringify(result));
      toast.success("signin Successfully",{
        position:"top-right",
        autoClose:2000,
        hideProgressBar:true,
        closeOnClick: true,
        pauseOnHover: true,
        progress: undefined,
        theme:"colored"
      })
      
      // localStorage.setItem('user', JSON.stringify(result))
      navigate('/')
      setLoading(false)

    } catch (error) {
     
      console.log(error);
      setLoading(false)
    }
  }
  return (
    <div className='flex justify-center items-center h-screen'>
      {loading && < Loader/>}
      <div className="bg-gray-800 px-10 py-10 rounded-xl">
        <div className=" font-bold text-white text-center mb-4 text-xl">
          <h2>Login</h2>
        </div>
        <div className="flex flex-col">
          <input
            type="mail"
            placeholder='Email'
            className='lg:w-[20em] bg-gray-600 mb-4 rounded px-3 py-1 text-white placeholder:text-gray-200 outline-none'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='password'
            className='lg:w-[20em] bg-gray-600 mb-4 rounded px-3 py-1 text-white placeholder:text-gray-200 outline-none'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
          onClick={signin}
           className='bg-yellow-300 hover:bg-yellow-400 w-full rounded text-center mb-3 font-semibold py-1'>
           Login</button>
        </div>
        <div className=" text-white">
          <h2>Don't have an account <Link className=' text-yellow-300 font-bold ml-2' to={'/signup'}>Sign up</Link></h2>
        </div>
      </div>
    </div>
  )
}

export default Login
