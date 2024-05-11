import React, { useEffect, useState } from "react";
import myContext from "./myContext";
import {fireDB} from '../../firebase/FirebaseConfig';
import { Timestamp, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { addDoc } from "firebase/firestore";

const MyState = ({ children }) => {

    const [mode, setMode] = useState('light');
    const [loading, setLoading] = useState(false)

    const toggleMode = () => {
        if (mode === 'light') {
            setMode('dark');
            document.body.style.backgroundColor = "rgb(17, 24, 39)"
        }
        else {
            setMode('light');
            document.body.style.backgroundColor = "white"
        }
    }


    const [products, setProducts] = useState({
        title: null,
        price: null,
        imageUrl: null,
        category: null,
        description: null,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
        
    })

    //  ---------------Add Product Section--------------
    const addProduct = async () => {
        if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
            return toast.error("Please fill all fields")
        }

        const productRef = collection(fireDB, "products")
        setLoading(true)
        try {
            await addDoc(productRef, products)
            toast.success("Product Add successfully")
            setTimeout(()=>{
                window.location.href = '/dashboard'
            },800)
            getProductData()
            setLoading(false)
        }
        catch (error) {
            console.log(error);
            setLoading(false)
        }
    }


    const [product, setProduct] = useState([])

    //get data

    const getProductData = async () => {
        setLoading(true)
        try {
            const q = query(
                collection(fireDB, "products"),
                orderBy("time"),
                //limit(5)
            );

            const data = onSnapshot(q,(QuerySnapshot) => {
                let productArray = [];
                QuerySnapshot.forEach((doc)=>{
                    productArray.push({...doc.data(), id: doc.id})
                });
                setProduct(productArray);
                setLoading(false);
            });
            return () => data;
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    //for fetch getproductdata
  useEffect(() => {
    getProductData();
  },[]);

  const edithandle = (item) => {
    setProducts(item)
  }

  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully")
      getProductData();
      setLoading(false)
      window.location.href = '/dashboard'
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
    setProducts("")
  }

  const deleteProduct =async (item) =>{
    setLoading(true)
    try {
        await deleteDoc(doc(fireDB, 'products', item.id))
        toast.success('Product Deleted successfully')
        getProductData()
        setLoading(false)
    } catch (error) {
        console.log(error);
        setLoading(false)
    }
  }

// orders
  const [order, setOrder] = useState([]);

  const getOrderData = async () =>{
    setLoading(true);
    try {
        const result = await getDocs(collection(fireDB, "order"))
        const ordersArray = [];
        result.forEach((doc)=>{
            ordersArray.push(doc.data());
            setLoading(false);
        });
        setOrder(ordersArray);
        console.log(ordersArray);
         setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
  }

  useEffect(()=>{
    getProductData();
    getOrderData();
  },[]);


  //get user data

  const [user, setUser] = useState([]);

  const getUserData = async ()=>{
    setLoading(true)
      try {
        const result = await getDocs(collection(fireDB, "users"))
        const userArray = [];
        result.forEach((doc)=>{
            userArray.push(doc.data());
            setLoading(false)
        });
        setUser(userArray);
        console.log(userArray);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
     }

  }

  useEffect(() => {
    getProductData();
    getOrderData();
    getUserData();
  }, []);


  //filter

  const [searchkey, setSearchkey] = useState('')
  const [filterType, setFilterType] = useState('')
  const [filterPrice, setFilterPrice] = useState('')

    return (
        <myContext.Provider value={{ mode, toggleMode, loading, setLoading, products,setProducts,addProduct, product,edithandle, updateProduct, deleteProduct,order, user,searchkey, setSearchkey,filterType, setFilterType,filterPrice, setFilterPrice}}>
            {children}
        </myContext.Provider>
    )
}

export default MyState;