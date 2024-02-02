import React, { useState } from 'react'
import Logo from "../../assets/Logo.png"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../Button'
import { logout } from '../../store/authSlice'
import { FaBars } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";
import Cookies from 'js-cookie'
import axios from 'axios'

function Header({ changeHandler }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authStatus = useSelector((state) => state.auth.status);
    const [show, setShow] = useState(false);

    const headerData = [
        {
            name: "home",
            to: "/",
            authStatus: true
        },
        {
            name: "All Posts",
            to: "/AllPosts",
            authStatus: authStatus,
        },
        {
            name: "Sign Up",
            to: "/signup",
            authStatus: !authStatus,
        },
        {
            name: "Login",
            to: "/login",
            authStatus: !authStatus,
        },
        {
            name: "Add Post",
            to: "/createblog",
            authStatus: authStatus,
        },
        {
            name: "dashboard",
            to: "/dashboard",
            authStatus: authStatus,
        }
    ]

    const logOutHandler = async () => {
        changeHandler(false);
        axios.post(`${import.meta.env.VITE_URL}/users/logout`)
            .then((res) => {
                // Remove JWT token cookie
                Cookies.remove('JWT');
                dispatch(logout())
                navigate('/');
            })
            .catch((err) => notify(err.response.message))
            .finally(() => changeHandler(true))
    }


    return (
        <header className='  w-full z-50 py-4  header-section' >
            <div className='container' >
                <div className='flex justify-between items-center' >
                    <div>
                        <Link to="/" >
                            <img src={Logo} className='md:w-3/4 w-2/3' alt="logo" />
                        </Link>
                    </div>

                    {/* header for large screen */}
                    <nav className='md:block hidden'>
                        <ul className='flex justify-between items-center ' >
                            {
                                headerData.map((data) =>

                                    data.authStatus ? (
                                        <Link key={data.name} className={`mx-4 capitalize `} to={data.to} >{data.name}</Link>
                                    ) : null
                                )
                            }
                            {
                                authStatus && <Button onClick={logOutHandler} classname='ms-4 font-normal md:w-[75px] md:py-2 rounded-xl capitalize'>Logout</Button>
                            }
                        </ul>
                    </nav>

                    {/* header for mobile  */}
                    <div className={`md:hidden z-[999] fixed -translate-x-full top-0 left-0 bg-white w-[240px] h-screen rounded-r-xl shadow-lg p-3 py-4 duration-500 ease-in-out ${show ? "translate-x-0" : ""}`} >
                        <div className='h-[5%] flex justify-between items-center' >
                            <Link className='text-4xl font-bold tracking-wider text-white' >
                                <img src={Logo} className='md:w-3/4 w-[65%]' alt="logo" />
                            </Link>
                            <Button classname='ms-2 bg-[#444961] hover:bg-[#444944] md:hidden py-2 px-2 rounded-md' onClick={() => setShow(false)} ><FaWindowClose /></Button>
                        </div>
                        <ul className='flex flex-col h-[96%] mt-5' >
                            {
                                headerData.map((data) =>

                                    data.authStatus ? (
                                        <li key={data.name} className='my-2' >
                                            <Link className={` font-medium inline-block hover:text-green-900 duration-300 py-1 px-1 rounded-xl capitalize `} to={data.to} >{data.name}</Link>
                                        </li>
                                    ) : null
                                )
                            }
                            {
                                authStatus && <Button onClick={logOutHandler} classname='mt-auto mb-4 font-normal md:w-[75px] md:py-2 rounded-xl capitalize'>Logout</Button>
                            }
                        </ul>
                    </div>

                    <Button classname='ms-2 bg-opacity-90 hover:bg-opacity-90 md:hidden py-3 px-3 rounded-md' onClick={() => setShow(true)}  ><FaBars /></Button>
                </div>
            </div>
        </header>
    )
}

export default Header;