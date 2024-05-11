import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
// import './App.css'
import LayOut from './components/layout/LayOut'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Order from './pages/Order/Order'
import NoPage from './pages/NoPage/NoPage'
import MyState from './context/Data/MyState'
import Login from './pages/Registration/Login'
import SignUp from './pages/Registration/SignUp'
import ProductInfo from './pages/product info page/ProductInfo'
import Dashboard from './pages/Admin/Dashboard/Dashboard'
import AddProduct from './pages/Admin/pages/AddProduct'
import UpdateProduct from './pages/Admin/pages/UpdateProduct'
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { Children } from 'react'
import AllProduct from './pages/All product/AllProduct'

function App() {
  
const router = createBrowserRouter(
  
  createRoutesFromElements(
    <Route path='/' element={<LayOut/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/order' element={
        <ProtectedRoutes>
          <Order/>
        </ProtectedRoutes>
      }/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/productinfo/:id' element={<ProductInfo/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/allproducts' element={<AllProduct/>}/>
      <Route path='/dashboard' element={
        <ProtectedRouteForAdmin>
          <Dashboard/>
        </ProtectedRouteForAdmin>
      }/>
      <Route path='/addproduct' element={
        <ProtectedRouteForAdmin>
          <AddProduct/>
        </ProtectedRouteForAdmin>
      }/>
      <Route path='/updateproduct' element={
        <ProtectedRouteForAdmin>
          <UpdateProduct/>
        </ProtectedRouteForAdmin>
      } />
      <Route path='/*' element={<NoPage/>}/>
      
    </Route>
    
  )
  
)

  return (
    <MyState>
    
     <RouterProvider router = {router}/>
      <ToastContainer/>
    </MyState>
  )
}

export default App

// ProtectedRouter for User

export const ProtectedRoutes = ({children}) =>{

  if (localStorage.getItem('user')) {
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}


// for Admin

export const ProtectedRouteForAdmin = ({children}) =>{

  const admin = JSON.parse(localStorage.getItem('user'))
  console.log(admin.user.email)

  if(admin.user.email === 'missmama2001@gmail.com'){
    return children
  }
  else{
    return <Navigate to='/login'/>
  }
}