import React, { useContext, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import myContext from '../../../context/Data/myContext'
import { Link, useNavigate } from 'react-router-dom';
import { AiFillShopping } from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import { FaCartPlus } from 'react-icons/fa'
import { FiEdit } from "react-icons/fi";

function DashboardTab() {
    const navigate = useNavigate()
    const context = useContext(myContext)
    const { mode, product,edithandle, deleteProduct, order , user} = context

    // console.log(product);
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const add = () => {
        window.location.href = '/addproduct'
    }
    return (
        <>
            <div className="container mx-auto">
                <div className="container mx-auto">
                    <Tabs defaultIndex={0} className="">
                        <TabList className=' md:flex md:space-x-8 md:justify-center mb-10 gap-4 grid ml-8 grid-cols-2 '>
                            <Tab>
                                <button type='button' className='font-medium px-5 py-2 rounded-lg text-center bg-[#605d5d12] border border-purple-500 text-purple-500 text-lg w-[150px] shadow-inner shadow-slate-400  hover:scale-105 transition transform'>
                                    <div className=" flex gap-1 items-center">
                                        <MdOutlineProductionQuantityLimits />Products
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type='button' className='font-medium px-5 py-2 rounded-lg text-center bg-[#605d5d12] border border-pink-500 text-pink-500 text-lg w-[150px] shadow-inner shadow-slate-400 hover:border-b-2  hover:scale-105 transition transform'>
                                    <div className=" flex gap-1 items-center justify-center">
                                        <AiFillShopping />Order
                                    </div>
                                </button>
                            </Tab>
                            <Tab>
                                <button type='button' className='font-medium px-5 py-2 rounded-lg  bg-[#605d5d12] border border-green-500 text-green-500 text-lg w-[150px] shadow-inner shadow-slate-400 hover:border-b-2  hover:scale-105 transition transform hover:shadow-lg'>
                                    <div className=" flex gap-1 items-center justify-center">
                                        <FaUser />Users
                                    </div>
                                </button>
                            </Tab>
                        </TabList>

                        {/* Product */}

                        <TabPanel>
                            <div className='px-4 md:px-0 mb-16'>
                                <h1 className='text-center mb-5 font-bold text-3xl text-gray-400 underline'>
                                    Product Details
                                </h1>
                                <div className='flex justify-end mb-8'>
                                    <button
                                        onClick={add}
                                        type='button'
                                        className='border-pink-400 border-4 px-4 py-2 rounded-lg bg-pink-700 text-white font-semibold'
                                    >
                                        <div className='flex gap-2 items-center'>
                                            Add Product <FaCartPlus size={20} />

                                        </div>
                                    </button>
                                </div>

                                <div className="relative overflow-x-auto">
                                    <table className={`w-full text-sm text-gray-500 dark:text-gray-400 text-left uppercase ${mode === 'dark' ? 'shadow-ld' : ''}`}>

                                        <thead className='border text-xs border-gray-400 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]'>
                                            <tr>
                                                <th className='px-6 py-3'>
                                                    S.No
                                                </th>
                                                <th className='px-6 py-3'>
                                                    Image
                                                </th>
                                                <th className='px-6 py-3'>
                                                    Title
                                                </th>
                                                <th className='px-6 py-3'>
                                                    Price
                                                </th>
                                                <th className='px-6 py-3'>
                                                    Category
                                                </th>
                                                <th className='px-6 py-3'>
                                                    Date
                                                </th>
                                                <th className='px-6 py-3'>
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>

                                        {product.map((item, index) => {
                                            const { title, price, imageUrl, category,
                                                description, date } = item
                                            return (
                                                <tbody className='' key={item.id}>
                                                    <tr className='bg-gray-50 border-b-2 dark:border-gray-400' style={{ background: mode === "dark" ? "rgb(46 49 55)" : "", color: mode === "dark" ? "white" : "" }}>
                                                        <td className='px-6 py-4 text-black' style={{ color: mode === "dark" ? "white" : "" }}>{index + 1}</td>
                                                        <th scope='row '>
                                                            <img className='w-16' src={imageUrl} alt="img" />
                                                        </th>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {title}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {price}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {category}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {date}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className=" flex gap-2">
                                                                <div className=" flex gap-2 cursor-pointer text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                                    <div onClick={() => deleteProduct(item)}  >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                        </svg>
                                                                    </div>

                                                                    <div key={item.id}>
                                                                        {/* Use an arrow function to prevent immediate execution */}
                                                                        <Link to={'/updateproduct'} onClick={() => edithandle(item)}>
                                                                            <FiEdit size={20} />
                                                                        </Link>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>

                                                    </tr>
                                                </tbody>
                                            )
                                        })}

                                    </table>
                                </div>
                            </div>
                        </TabPanel>

                        {/* order */}
                        <TabPanel>
                            <div className='relative overflow-x-auto mb-16'>
                                <h1 className='text-center mb-5 font-bold text-3xl text-gray-400 underline'>
                                    Order Details
                                </h1>

                                {order.map((allOrder, index) => {
                                    return (

                                        <div className="relative overflow-x-auto">
                                            <table className={`w-full text-sm text-gray-500 dark:text-gray-400 text-left uppercase ${mode === 'dark' ? 'shadow-ld' : ''}`}>
                                                <thead className='border text-xs border-gray-400 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]'>
                                                    <tr>
                                                        <th scope='col' className='px-6 py-3'>
                                                            Payment Id
                                                        </th>
                                                        <th scope='col' className='px-6 py-3'>
                                                            Image
                                                        </th>
                                                        <th scope='col' className='px-6 py-3'>
                                                            Title
                                                        </th>
                                                        <th scope='col' className='px-6 py-3'>
                                                            Price
                                                        </th>
                                                        <th scope='col' className='px-6 py-3'>
                                                            Category
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Name
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Address
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Pincode
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Phone Number
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Email
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Date
                                                        </th>
                                                    </tr>
                                                </thead>
                                                
                                                {allOrder.cartItems.map((item, index) =>{
                                                    {/* console.log(allOrder) */}
                                                    const {title, description, category,imageUrl,price} = item
                                                    return(
                                                        <tbody className=''>
                                                    <tr className='bg-gray-50 border-b-2 dark:border-gray-400' style={{ background: mode === "dark" ? "rgb(46 49 55)" : "", color: mode === "dark" ? "white" : "" }}>
                                                        <td className='px-6 py-4 text-black' style={{ color: mode === "dark" ? "white" : "" }}>
                                                           {allOrder.paymentId}
                                                        </td>
                                                        <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                                                            <img className='w-16' src={imageUrl} alt="img" />
                                                        </th>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {title}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            ₹{price}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {category}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {allOrder.addressInfo.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {allOrder.addressInfo.address}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                           {allOrder.addressInfo.pincode}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {allOrder.addressInfo.phoneNumber}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                            {allOrder.email}
                                                        </td>
                                                        <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                           {allOrder.date}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                                    )
                                                })}
                                            </table>
                                        </div>


                                    )
                                })}
                            </div>


                        </TabPanel>

                        {/* user */}
                        <TabPanel>
                            <div className='relative overflow-x-auto mb-16'>
                                <h1 className='text-center mb-5 font-bold text-3xl text-gray-400 underline'>
                                    User Details
                                </h1>
                                 <div className="relative overflow-x-auto">
                                    <table className={`w-full text-sm text-gray-500 dark:text-gray-400 text-left uppercase ${mode === 'dark' ? 'shadow-ld' : ''}`}>
                                        <thead className='border text-xs border-gray-400 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]'>
                                            <tr>
                                                <th scope='col' className='px-6 py-3'>
                                                    S.No
                                                </th>
                                                <th scope='col' className='px-6 py-3'>
                                                    Name
                                                </th>
                                                <th scope='col' className='px-6 py-3'>
                                                    EMAIL
                                                </th>
                                                <th scope='col' className='px-6 py-3'>
                                                    UID
                                                </th>
                                                
                                                <th scope="col" className="px-6 py-3">
                                                    Date
                                                </th>

                                            </tr>
                                        </thead>
                                        
                                        {user.map((item, index) =>{
                                            const {name, uid, email, date}= item;
                                            {/* console.log("user" + user); */}
                                            return(
                                                <tbody className='' key={index}>
                                            <tr className='bg-gray-50 border-b-2 dark:border-gray-400' style={{ background: mode === "dark" ? "rgb(46 49 55)" : "", color: mode === "dark" ? "white" : "" }}>
                                                <td className='px-6 py-4 text-black' style={{ color: mode === "dark" ? "white" : "" }}>
                                                    {index+1}.
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {name}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {email}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {uid}
                                                </td>
                                                <td className="px-6 py-4 text-black " style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                    {date}
                                                </td>
                                                

                                            </tr>
                                        </tbody>
                                            )
                                        })}
                                    </table>
                                </div>
                                    
                            </div>
                        </TabPanel>



                    </Tabs>
                </div>
            </div>
        </>
    )
}

export default DashboardTab



