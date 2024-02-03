import { useEffect, useState } from 'react'
import './App.css'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from "axios"
import Cookies from 'js-cookie'; // Import the js-cookie library
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { login } from './store/authSlice';
import Spinner from './components/Spinner';

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false)
    axios.get(`${import.meta.env.VITE_URL}/users`, {
      headers: { "Authorization": Cookies.get('JWT') }
    })
      .then((response) => {
        if (response) {
          dispatch(login(response.data.data));
        }
      })
      .catch((error) => {
        console.log("err", error);
      })
      .finally(() => setLoading(true))
  }, [])


  return (
    <>
      {
        loading ?
          <>
            <Header changeHandler={(res) => setLoading(res)} />
            <Outlet />
            <Footer />
          </>
          : <Spinner />
      }
    </>
  )
}

export default App;
