import React, { useEffect, useState } from 'react'
import { AdminPostShow, DashBoardAsideBar, DeshBordHeader } from '../components';
import axios from 'axios';
import Cookies from 'js-cookie';
import { login } from '../store/authSlice';
import Spinner from '../components/Spinner';
import { useDispatch } from 'react-redux';

function DashBordPage() {

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const aslidebarhandler = (value) => {
    setShow(value)
  }

  useEffect(() => {
    setLoading(false);
    axios.get(`${import.meta.env.VITE_URL}/users`, {
      headers: { "Authorization": Cookies.get('JWT') }
    })
      .then((response) => {
        if (response) {
          dispatch(login(response.data.data));
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setLoading(true))
  }, [])

  return (
    <>
      {
        loading ?
          <div className='grid grid-cols-10 bg-[#232946]'>
            <div className={`lg:col-span-2 md:col-span-3 md:block duration-500 ease-in-out  z-[50] ${show ? "bg-black bg-opacity-40 fixed w-screen h-screen " : ""} `}>
              <DashBoardAsideBar aslidebarhandler={aslidebarhandler} show={show} />
            </div>
            <div className='lg:col-span-8 md:col-span-7 col-span-10'>
              <DeshBordHeader aslidebarhandler={aslidebarhandler} />
              <AdminPostShow />
            </div>
          </div>
          : <Spinner />
      }
    </>
  )
}

export default DashBordPage;