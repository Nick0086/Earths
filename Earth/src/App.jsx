import { useState } from 'react'
import './App.css'
import { Footer, Header, Spinner } from "./components/index"
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import authService from './Appwrite/Auth';
import { login, logout } from './store/authSlice';

import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {

  const [loding, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    authService.getuser()
      .then((response) => {
        if (response) {
          dispatch(login(response));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false))
  },[])

  return (
    <>
      {
        loding ?
          <Spinner /> :
          <>
            <Header changeHandler={(res) => setLoading(res)} />
            <Outlet />
            <Footer />
          </>
      }
    </>
  )
}

export default App
