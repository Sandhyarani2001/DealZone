import React, { useContext } from 'react'
import myContext from '../../../context/Data/myContext'

function AddProduct() {

    const context = useContext(myContext)
    const { products, setProducts, addProduct } = context

    return (
        <div className='container mx-auto'>
            <div className=" flex justify-center items-center h-screen mt-0">
                <div className="px-10 py-6 rounded-xl bg-gray-800">
                    <div className="text-center font-bold mb-8 text-white text-3xl">
                        <h1>Add Product</h1>
                    </div>
                    <div className=''>
                        <input type="text"
                            value={products.title}
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            name='title'
                            placeholder='Product title'
                            className='bg-gray-600 px-2 mb-3 py-2 rounded-lg w-full lg:w-[20em] text-white placeholder:text-gray-200 outline-none '
                        />
                    </div>
                    <div className=''>
                        <input type="text"
                            value={products.price}
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            name='price'
                            placeholder='Product Price'
                            className='bg-gray-600 px-2 mb-3 py-2 rounded-lg w-full lg:w-[20em] text-white placeholder:text-gray-200 outline-none '
                        />
                    </div>
                    <div className=''>
                        <input type="text"
                            value={products.imageUrl}
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            name='imageurl'
                            placeholder='Product Image'
                            className='bg-gray-600 px-2 mb-3 py-2 rounded-lg w-full lg:w-[20em] text-white placeholder:text-gray-200 outline-none '
                        />
                    </div>
                    <div className=''>
                        <input type="category"
                            value={products.category}
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            name='price'
                            placeholder='Product Category'
                            className='bg-gray-600 px-2 mb-3 py-2 rounded-lg w-full lg:w-[20em] text-white placeholder:text-gray-200 outline-none '
                        />
                    </div>
                    <div>
                        <textarea cols="30" rows="10" name='title'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Product description'
                            value={products.description}
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                        >

                        </textarea>
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                        onClick={addProduct}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Add Product
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProduct
