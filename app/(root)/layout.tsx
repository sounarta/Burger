import React from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className=' relative  mx-auto max-w-6xl'>
        
     <Navbar/>
     {children}
     <Footer/>
        
        </div>
  )
}

export default Layout