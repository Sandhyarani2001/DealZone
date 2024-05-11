import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import myContext from '../../context/Data/myContext';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {toast} from 'react-toastify'
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { ToastContainer } from 'react-toastify';

function SignUp() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");

  const context = useContext(myContext);
  const {loading, setLoading} = context;

  const signup = async () =>{
    // console.log(name,  email,password);
    
    // user abhi create nhi hua hai toh loader ko dikhaiga
    setLoading(true)

    if(name === "" || email === "" || password === ""){
      return toast.error("All fields are required");
    }

    try {
      const users = await createUserWithEmailAndPassword(auth, email, password);
      console.log(users);

      const user = {
        name: name,
        uid: users.user.uid,
        email: users.user.email,
        time: Timestamp.now()
      }

      const userRef = collection(fireDB, "users")
      await addDoc(userRef, user);
      toast.success("signUp Successfully")
      setName("");
      setEmail("");
      setPassword("");
      // after create user setloading will be false
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  
  return (
    <div className='flex justify-center items-center h-screen'>
    {loading && <Loader/>}
    <div className="bg-gray-800 px-10 py-10 rounded-xl">
      <div className=" font-bold text-white text-center mb-4 text-xl">
          <h2>Sign up</h2>
      </div>
      <div className="flex flex-col">
          <input
            name='name'
            value={name}
            type="text"
            placeholder='Name'
            className='lg:w-[20em] bg-gray-600 mb-4 rounded px-3 py-1 text-white placeholder:text-gray-200 outline-none'
            onChange={(e) => setName(e.target.value)}
           />
          <input
           type="mail"
            placeholder='Email'
            className='lg:w-[20em] bg-gray-600 mb-4 rounded px-3 py-1 text-white placeholder:text-gray-200 outline-none'
            name='email'
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
            />
          <input 
          type="password" 
          placeholder='password'  
          className='lg:w-[20em] bg-gray-600 mb-4 rounded px-3 py-1 text-white placeholder:text-gray-200 outline-none'
          name='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button
          onClick={signup}
           className='bg-[#FF0000] hover:bg-[#FF1313] w-full rounded text-center mb-3 font-semibold py-1 text-[#fff]'>
           signup</button>
      </div>
      <div className=" text-white">
          <h2>Have an account <Link className=' text-[#FF0000] font-bold ml-2' to={'/login'}>Login</Link></h2>
      </div>
    </div>
  </div>
  )
}

export default SignUp
