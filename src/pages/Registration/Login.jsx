import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import myContext from '../../context/Data/myContext';
import { auth } from '../../firebase/FirebaseConfig';
import { useDispatch } from 'react-redux';
import { setCart } from '../../redux/cartSlice';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';

function Login() {
    const context = useContext(myContext)
    const {loading, setLoading} = context;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchCartItems = async (userEmail) => {
      const cartItems = [];
      const q = query(collection(fireDB, 'cart'), where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          cartItems.push(doc.data());
      });
      return cartItems;
  };

    const signin = async () => {
        setLoading(true)
        try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            toast.success("Login successful", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            localStorage.setItem('user', JSON.stringify(result))

           // Fetch cart items from Firestore after login
           const cartItems = await fetchCartItems(result.user.email);

           // Update Redux store with fetched cart items
           dispatch(setCart(cartItems));
            
            navigate('/')
            setLoading(false)
            
        } catch (error) {
            console.log(error)
            toast.error("Invali email and password", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              })
            setLoading(loading)
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
            type="email"
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
