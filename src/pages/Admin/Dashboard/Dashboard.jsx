import React, { useContext } from 'react'
import { FaUserTie } from "react-icons/fa";
import DashboardTab from './DashboardTab';
import myContext from '../../../context/Data/myContext';

function Dashboard() {
  const context = useContext(myContext)
  const {mode} = context
  return (
    <section className=' mt-16 mb-10 text-gray-800'>
        <div className="container px-5 py-8 mx-auto mb-10 ">
           <div className="flex flex-wrap -m-4 text-center">
            <div className=" p-4 w-full md:w-1/4 sm:w-1/2">
              <div className="flex flex-col gap-3 hover:shadow-blue-900 text-blue-800 bg-gray-100 border-gray-3 shadow-inner 
                 shadow-slate-500 justify-center items-center py-3 rounded-xl border
                   " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                   <FaUserTie size={50}/>
                   <h2 className="text-2xl font-bold text-black" style={{ color: mode === 'dark' ? 'white' : ''}}>10</h2>
                   <p className=' font-semibold text-lg' style={{ color: mode === 'dark' ? 'white' : ''}}>Total Products</p>
              </div>
            </div>
            <div className=" p-4 w-full md:w-1/4 sm:w-1/2 ">
              <div className="flex flex-col gap-3 hover:shadow-blue-900 text-blue-800 bg-gray-100 border-gray-3 shadow-inner  shadow-[inset_0_0_50px_rgba(10,10,0.5,0.9)  
                 shadow-slate-500 justify-center items-center py-3 rounded-xl border
                   " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                   <FaUserTie size={50}/>
                   <h2 className="text-2xl font-bold text-black" style={{ color: mode === 'dark' ? 'white' : ''}}>10</h2>
                   <p className=' font-semibold text-lg' style={{ color: mode === 'dark' ? 'white' : ''}}>Total Orders</p>
              </div>
            </div>
            <div className=" p-4 w-full md:w-1/4 sm:w-1/2">
              <div className="flex flex-col gap-3 hover:shadow-blue-900 text-blue-800 bg-gray-100 border-gray-3 shadow-inner
                 shadow-slate-500 justify-center items-center py-3 rounded-xl border
                   " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                   <FaUserTie size={50}/>
                   <h2 className="text-2xl font-bold text-black" style={{ color: mode === 'dark' ? 'white' : ''}}>20</h2>
                   <p className=' font-semibold text-lg' style={{ color: mode === 'dark' ? 'white' : ''}}>Total User</p>
              </div>
            </div>
            <div className=" p-4 w-full md:w-1/4 sm:w-1/2 ">
              <div className="flex flex-col gap-3 hover:shadow-blue-900 text-blue-800 bg-gray-100 border-gray-3 shadow-inner
                 shadow-slate-500 justify-center items-center py-3 rounded-xl border
                   " style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                   <FaUserTie size={50}/>
                   <h2 className="text-2xl font-bold text-black" style={{ color: mode === 'dark' ? 'white' : ''}}>20</h2>
                   <p className=' font-semibold text-lg' style={{ color: mode === 'dark' ? 'white' : ''}}>Total Products</p>
              </div>
            </div>
           </div>
        </div>
         <DashboardTab/>
    </section>

   
  ) 
}

export default Dashboard
