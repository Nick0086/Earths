import React from 'react'
import Logo from "../../assets/Logo.png"
import { Link } from 'react-router-dom';
function Footer() {

  return (
    <div className='container py-9'>
      <div className='flex justify-between items-center' >
        <div className='basis-1/3 '  >
          <Link to='/'>
            <img src={Logo} className='md:w-[40%] w-[90%] ' alt=""/>
          </Link>
        </div>
        <div className='basis-2/3' >
          <p className='md:text-sm text-xs md:tracking-wide tracking-tight text-end font-semibold ' >©2022 Earth. All right reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;