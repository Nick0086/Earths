import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import  './DahBoardAsideBar.css'
import { FaBars } from "react-icons/fa6";
import Button from '../Button';
import { FaWindowClose } from "react-icons/fa";
function DashBoardAsideBar({aslidebarhandler,show}) {

    const AsideBarMenu = [
        {
            name:"Dashboard",
            path:"/dashboard"
        },
        {
            name:"Posts",
            path:"/category/Posts"
        },
        {
            name:"Personal",
            path:"/category/Personal"
        },
        {
            name:"News",
            path:"/category/News"
        },
        {
            name:"Sport",
            path:"/category/Sport"
        },
        {
            name:"Travel",
            path:"/category/Travel"
        },
        {
            name:"Food",
            path:"/category/Food"
        },
        {
            name:"Fashion",
            path:"/category/Fashion"
        },
        {
            name:"Finance",
            path:"/category/Finance"
        },
        {
            name:"Music",
            path:"/category/Music"
        },
        {
            name:"Business",
            path:"/category/Business"
        },
        {
            name:"Lifesyle",
            path:"/category/Lifesyle"
        }
]

  return (
    <div className={`p-4 pe-2 md:sticky top-0 h-[100vh] md:w-auto w-[250px] duration-500 ease-in-out md:block fixed   bg-[#232946] z-50 ${show ? "left-0" : "-left-full"} `} >
        <div className='mb-6 h-[7%] md:block flex justify-between items-center' >
            <Link className='text-4xl font-bold tracking-wider text-white' >  
                EARTH
            </Link>
            <Button classname='ms-2 bg-[#444961] hover:bg-[#444944] md:hidden py-3 px-3 rounded-md' onClick={() => aslidebarhandler(false)} ><FaWindowClose /></Button>
        </div>
        <div className='h-[93%] overflow-y-auto custom-scrollbar'> 
            <ul>
            {
                AsideBarMenu && AsideBarMenu.map((menu)=> (
                    <li key={menu.name} className='mb-2 me-2 text-base font-medium' >
                        <NavLink to={menu.path} className={({isActive}) => `block p-2 duration-100 ease-in-out  ${isActive ? "text-black bg-[#EEBBC3] rounded-lg" : "text-white"}` } >{menu.name}</NavLink>
                    </li>
                ))
            }
            </ul>
        </div>
    </div>
  )
}

export default DashBoardAsideBar