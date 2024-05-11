import React, { useContext } from 'react'
import { MdWorkOutline } from "react-icons/md";
import myContext from '../../context/Data/myContext';
import { LiaShippingFastSolid } from "react-icons/lia";
import { TbCoinRupee } from "react-icons/tb";

function Track() {
    const context = useContext(myContext)
    const {mode} = context
  return (
    <div>
      <section className=' text-gray-800'>
          <div className="container mx-auto px-5">
            <div className="flex flex-wrap">
               <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div className="border-2 hover:shadow-xl hover:shadow-gray-300 p-5 text-center bg-gray-100 px-4 py-6">
                       <MdWorkOutline className='text-pink-600 w-12 h-12 inline-block '/>
                       <h2 className='title-font font-medium text-lg text-gray-900' >Premium Tshirts</h2>
                       <p> Our T-Shirts are 100% made of cotton.</p>
                    </div>
                </div>
                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div className="border-2 hover:shadow-xl hover:shadow-gray-300 p-5 text-center bg-gray-100 px-4 py-6">
                       <LiaShippingFastSolid className='text-pink-600 w-12 h-12 inline-block '/>
                       <h2 className='title-font font-medium text-lg text-gray-900'>Free Shipping</h2>
                       <p> We ship all over India for FREE.</p>
                    </div>
                </div>
                <div className="p-4 md:w-1/3 sm:w-1/2 w-full">
                    <div className="border-2 hover:shadow-xl hover:shadow-gray-300 p-5 text-center bg-gray-100 px-4 py-6">
                       <TbCoinRupee className='text-pink-600 w-12 h-12 inline-block '/>
                       <h2 className='title-font font-medium text-lg text-gray-900'>Exciting Offers</h2>
                       <p className='leading-relaxed'>We provide amazing offers & discounts.</p>
                    </div>
                </div>
            </div>
          </div>
      </section>
    </div>
  )
}

export default Track
