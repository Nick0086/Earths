import React, { useState } from 'react'
import { DeshBordHeader, AdminPostShow } from "../components/index"
import DashBoardAsideBar from '../components/DashBoardAsideBar/DashBoardAsideBar';

function DashboardPage() {

  const[show,setShow] = useState(false);

  const aslidebarhandler = (value) => {
    setShow(value)
  }



  return (
    <div className='grid grid-cols-10 bg-[#232946]'>
      <div className={`lg:col-span-2 md:col-span-3 md:block duration-500 ease-in-out  z-[50] ${show ? "bg-black bg-opacity-40 fixed w-screen h-screen " : ""} `}>
        <DashBoardAsideBar aslidebarhandler={aslidebarhandler} show={show}  />
      </div>
      <div className='lg:col-span-8 md:col-span-7 col-span-10'>
        <DeshBordHeader aslidebarhandler={aslidebarhandler} />
        <AdminPostShow />
      </div>
    </div>
  )
}

export default DashboardPage;