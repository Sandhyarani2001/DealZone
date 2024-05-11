import React, { useContext } from 'react'
import myContext from '../../context/Data/myContext'

function Testimonial() {
    const context = useContext(myContext);
    const {mode} = context
  return (
    <div>
      <section className='text-gray-600 mb-10'>
        <div className="container mx-auto px-5 py-10">
         <h2 className=' font-bold text-3xl text-center'  style={{color: mode === 'dark' ? 'white' : ''}}>Testimonial</h2>
         <h3 className=' text-2xl font-semibold mb-14 text-center'  style={{color: mode === 'dark' ? 'white' : ''}}>What our <span className=' text-pink-600'>customers</span> are saying</h3>
         <div className="flex flex-wrap -m-4">
            <div className=" lg:w-1/3 lg:mb-0">
                <div className=" text-center p-4">
                    <img src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="testimonial" className='w-20 h-20 object-cover object-center rounded-full inline-block mb-4 border-2 border-gray-400'/>
                    <p className=""  style={{color: mode === 'dark' ? 'white' : ''}}>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                    <span className='h-1 rounded inline-block bg-pink-600 w-16 mb-2 mt-2'/>
                    <h2 className="Senior Product Designer font-bold"  style={{color: mode === 'dark' ? '#ff4162' : ''}}>Kamal Nayan Upadhyay</h2>
                    <p className=" text-gray-500" style={{color: mode === 'dark' ? 'white' : ''}}>Senior Product Designer</p>
                </div>
            </div>
            <div className=" lg:w-1/3 lg:mb-0 ">
                <div className=" text-center p-4">
                    <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600" alt="testimonial" className='w-20 h-20 object-cover object-center rounded-full inline-block mb-4 border-2 border-gray-400'/>
                    <p className=""  style={{color: mode === 'dark' ? 'white' : ''}}>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                    <span className='h-1 rounded inline-block bg-pink-600 w-16 mb-2 mt-2'/>
                    <h2 className="Senior Product Designer font-bold"  style={{color: mode === 'dark' ? '#ff4162' : ''}}>Kamal Nayan Upadhyay</h2>
                    <p className=" text-gray-500 leading-relaxed" style={{color: mode === 'dark' ? 'white' : ''}}>Senior Product Designer</p>
                </div>
            </div>
            <div className=" lg:w-1/3 lg:mb-0 ">
                <div className=" text-center p-4">
                    <img src="https://webknudocs.vercel.app/logo/react.png" alt="testimonial" className='w-20 h-20 object-cover object-center rounded-full inline-block mb-4 border-2 border-gray-400'/>
                    <p className=""  style={{color: mode === 'dark' ? 'white' : ''}}>Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid fanny pack vaporware.</p>
                    <span className='h-1 rounded inline-block bg-pink-600 w-16 mb-2 mt-2'/>
                    <h2 className="Senior Product Designer font-bold"  style={{color: mode === 'dark' ? '#ff4162' : ''}}>React Js</h2>
                    <p className=" text-gray-500" style={{color: mode === 'dark' ? 'white' : ''}}>CTO</p>
                </div>
            </div>
         </div>
         </div>
      </section>
    </div>
  )
}

export default Testimonial
