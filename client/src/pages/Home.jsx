import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import Bloglist from '../components/Bloglist'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div >
      <div className='pb-3 '>
        <Navbar/>
        <Header/>
      </div>
      <Bloglist/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Home
