import React, { useContext, useEffect, useState } from 'react'
import { RiDeleteBin6Line } from "react-icons/ri";
import myContext from '../../context/Data/myContext';
import Modal from '../../components/Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, setCart } from '../../redux/cartSlice';
import { toast } from 'react-toastify';
import { fireDB } from '../../firebase/FirebaseConfig';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';
import './Cart.css'

function Cart() {


  const context = useContext(myContext)
  const { mode } = context

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cartItems = useSelector((state) => state.cart)
  
  // console.log(cartItems);


  const deleteCart = (item) => {
    dispatch(removeFromCart(item))
    toast.success("Delete cart")
  }

  
  // //delete from local storage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);



  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      setError(null);

      const userData = JSON.parse(localStorage.getItem('user'));
      const userEmail = userData?.user?.email;

      try {
        const q = query(collection(fireDB, 'cart'), where('email', '==', userEmail));
        const querySnapshot = await getDocs(q);

        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update Redux state with fetched cart items
        dispatch(setCart(items));
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cart items');
        setLoading(false);
        console.log(err);
      }
    };

    fetchCartItems();
  }, [dispatch]);

  


  
  

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItems) => {
      temp = temp + parseInt(cartItems.price)
    })
    setTotalAmount(temp);
    console.log(temp)
  }, [cartItems])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  let shipping = 0;
  //  totalAmout <= 300 ? parseInt(100) : parseInt(0);
  if (totalAmount == 0) {
    shipping = 0;
  }
  else if (totalAmount > 0) {
    if (totalAmount <= 300) {
      shipping = 100
    }
    else {
      shipping = 0
    }
  }
  const grandTotal = shipping + totalAmount;
  // console.log(grandTotal);
  // ============================================================
  //                        payment integration
  // ============================================================
  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const buyNow = async () => {
    // validation 
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }

    // adress information 
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }

    //paymengt intigrasion 

    var options = {
      key: "rzp_test_VeWBNJEY8zlSZ5",
      key_secret: "vT64rTVf42HPZ0XBc847BwxB",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      order_receipt: "order_rcptid_" + name,
      name: "DealZone",
      description: "for testing purpose",
      handler: function (response) {
        console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id;

        //store in firebase
        const orderInfo = {
          cartItems,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId
        }

        try {
          const orderRef = collection(fireDB, "order");
          addDoc(orderRef, orderInfo)
        } catch (error) {
          console.log(error);
        }
      },

      theme: {
        color: "#3399cc"
      }

    };

    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)


  }


  return (
    <div className=' bg-gray-100 pt-5 h-screen'>
      <h1 className='font-bold mb-8 text-center text-3xl'>Cart Items</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
        <div className="rounded-lg md:w-2/3 ">
          <div className="scrollable-cart-items">
            {cartItems.map((item, index) => {
              const { title, price, description, imageUrl } = item
              return (
                <div key={index} className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                  <img src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0 mr-5">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                      <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{description}</h2>
                      <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>{price}</p>
                    </div>
                    <div onClick={() => { deleteCart(item) }} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>

                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>subtotal</p>
            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}> ₹{totalAmount}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}> ₹{shipping}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between mb-3">
            <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
            <div className>
              <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}> ₹{grandTotal}</p>
            </div>
          </div>
          {/* <Modal  /> */}
          <Modal
            name={name}
            address={address}
            pincode={pincode}
            phoneNumber={phoneNumber}
            setName={setName}
            setAddress={setAddress}
            setPincode={setPincode}
            setPhoneNumber={setPhoneNumber}
            buyNow={buyNow}
          />
        </div>
      </div>
      )}
    </div>
  )
}

export default Cart
