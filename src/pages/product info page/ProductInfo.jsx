import React, { useContext, useState, useEffect} from 'react'
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BiSolidMessageRounded } from "react-icons/bi";
import { IoMdHeart } from "react-icons/io";
import myContext from '../../context/Data/myContext';
import { useParams } from 'react-router-dom';
import { addToCart, setCart } from '../../redux/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';

function ProductInfo() {
    const context = useContext(myContext);
    const {loading,setLoading} = context;

    const [products, setProducts] = useState('');
    const params = useParams()
    // console.log(products.title);

    

    const getProductData = async () => {
      setLoading(true)
      try {
          const productTemp = await getDoc(doc(fireDB, "products", params.id))
          // console.log(productTemp)
          setProducts(productTemp.data());
          // console.log(productTemp.data())
          setLoading(false)
      } catch (error) {
          console.log(error)
          setLoading(false)
      }
  }

  useEffect(() => {
    getProductData()

}, [])


const dispatch = useDispatch()
const cartItems = useSelector((state) => state.cart)
// console.log(cartItems)


useEffect(() => {
  const fetchCartItems = async () => {
      const userData = JSON.parse(localStorage.getItem('user'));
      const userEmail = userData?.user?.email;

      if (userEmail) {
          try {
              const q = query(collection(fireDB, 'cart'), where('email', '==', userEmail));
              const querySnapshot = await getDocs(q);

              const items = querySnapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...doc.data(),
              }));

              dispatch(setCart(items));
          } catch (err) {
              console.log('Failed to fetch cart items:', err);
          }
      }
  };

  fetchCartItems();
}, [dispatch]);

// add to cart
const addCart = (products) => {
    dispatch(addToCart(products))
    toast.success("add to cart")
}

useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
}, [cartItems])


  return (
    <>
     <section className=' text-gray-800'>
        <div className="container mx-auto px-5 py-32 flex justify-center">
            {products && 
            <div className=" lg:w-4/5 flex flex-wrap ">
                <img src={products.imageUrl} alt="product info"
                 className='md:w-[400px] w-full h-[400px]  rounded object-cover object-center' />
                <div className="w-full lg:w-1/2 lg:pl-10  ">
                    <h2 className='lg:{mb-1} font-semibold text-gray-400 tracking-widest text-sm mt-3'>BRAND NAME</h2>
                    <h2 className='lg:{mb-1} text-gray-900 font-bold text-3xl mb-3'> {products.title}</h2>
                  <div className="flex text-blue-600 gap-1 items-center mb-3">
                   <FaStar/>
                   <FaStar/>
                   <FaStar/>
                   <FaStar/>
                   <FaRegStar/>

                   <h3 className=' ml-4 '>4 Reviews</h3>
                   <span className='flex p-2 ml-2 border-l-2 border-gray-200 space-x-2.5 '>
                     <a className="text-gray-500 hover:text-blue-700 hover:scale-125 transition transform">
                        <FaFacebookF/>
                      </a>
                      <a className="text-gray-500 hover:text-blue-700 hover:scale-125 transition transform">
                      <FaTwitter/>
                      </a>
                      <a className="text-gray-500 hover:text-blue-700 hover:scale-125 transition transform">
                      <BiSolidMessageRounded/>
                      </a>
                    </span>
                  </div>
                  <p className="leading-relaxed border-b-2 mb-5 pb-5">
                     {products.description}
                  </p>
                  <div className="flex flex-wrap justify-between">
                    <h2 className="font-bold text-xl">₹{products.price}</h2>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>addCart(products)} className=' bg-blue-700 px-3 py-2 rounded text-white font-semibold'>Add To Cart</button>
                      <div className=" w-8 h-8 bg-gray-200 flex justify-center items-center rounded-full">
                      <IoMdHeart className='text-gray-400 w-6 h-4'/>
                      </div>
                    </div>
                  </div>

                </div>
            </div>}
        </div>
     </section> 
    </>
  )
}

export default ProductInfo
