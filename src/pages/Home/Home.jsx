import React, { useContext } from 'react'
// import myContext from '../../context/Data/myContext'
import HeroSection from '../../components/Herosection/HeroSection'
import Filter from '../../components/filter/Filter'
import ProductCart from '../../components/product cart/ProductCart'
import Track from '../../components/Track/Track'
import Testimonial from '../../components/testimonial/Testimonial'
import {useDispatch, useSelector} from 'react-redux'
import { addToCart, removeFromCart } from '../../redux/cartSlice'
import { Link } from 'react-router-dom'

function Home() {

  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart)
  console.log(cartItem)

  const addCart = () =>{
    dispatch(addToCart("shirt"))
    console.log(" add to click");
  }

  const deleteCart = () =>{
    dispatch(removeFromCart("shirt"))
    console.log(" delete to click");
  }
  
  return (
    <div>
    {/* <div className="flex justify-center gap-5">
      <button className='bg-gray-300 p-5' onClick={()=> {addCart()}}>Add</button>
      <button className='bg-gray-300 p-5' onClick={()=> deleteCart()}>del</button>
    </div> */}
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

