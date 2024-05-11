import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'
import {Outlet} from 'react-router-dom'

function LayOut() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default LayOut
