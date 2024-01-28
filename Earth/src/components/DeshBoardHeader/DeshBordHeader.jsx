import React from 'react'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import { FaBars } from "react-icons/fa6";
import "./DashBordHeader.css"



function DeshBordHeader({aslidebarhandler}) {

  const navigate = useNavigate()

  return (
    <div className=' text-end w-full py-3 px-3 sticky top-0 bg-[#232946] mb-3 '>
      <div className='md:block flex items-center md:justify-end justify-between' >
        <Button classname='md:w-[110px] w-[75px] md:py-[8px] rounded-lg  dash-header-btn' onClick={() => navigate('/')} >Home</Button>
        <Button classname='ms-2 bg-[#444961] hover:bg-[#444944] md:hidden py-3 px-3 rounded-md dash-header-btn' onClick={() => aslidebarhandler(true)} ><FaBars /></Button>
      </div>
    </div>
  )
}

export default DeshBordHeader