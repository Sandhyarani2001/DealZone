// import React, { useContext } from 'react'
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import myContext from '../../context/Data/myContext'
import HeroSection from '../../components/Herosection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCart from '../../components/product cart/ProductCart'
import Track from '../../components/Track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import { setCart } from '../../redux/cartSlice';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { fireDB } from '../../firebase/FirebaseConfig';
// import {useDispatch, useSelector} from 'react-redux'
// import { addToCart, removeFromCart, } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'

function Home() {

  // const context = useContext(myContext)

  // const dispatch = useDispatch();
  // const cartItem = useSelector((state) => state.cart)
  // console.log(cartItem)

  // const addCart = () =>{
  //   dispatch(addToCart("shirt"))
  //   console.log(" add to click");
  // }

  // const deleteCart = () =>{
  //   dispatch(removeFromCart("shirt"))
  //   console.log(" delete to click");
  // }

  const dispatch = useDispatch();
  // const {loading, setLoading} = context;

  useEffect(() => {
    const fetchCartItems = async () => {
      // setLoading(true)
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

          // Update Redux state with fetched cart items
          dispatch(setCart(items));
          // setLoading(false)
        } catch (err) {
          console.log('Failed to fetch cart items:', err);
          // setLoading(loading)
        }
      }
    };

    fetchCartItems();
  }, [dispatch]);
  
  return (
    <div>
    <HeroSection/>
     <Filter/>
     <ProductCart/>
     <div className='flex justify-center -mt-10 mb-4'>
      <Link to={'/allproducts'}>
        <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
      </Link>
     </div>
     <Track/>
     <Testimonial/>
    
    </div>
  )
}

export default Home

