import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function PrivateRoutes({ isLoggedIn, children }) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const authStatus = Cookies.get('status') || false;

  useEffect(() => {
    if (isLoggedIn && !authStatus) {
      navigate('/')
    } else if (!isLoggedIn && authStatus) {
      navigate('/')
    }
    setLoading(false);
  }, [isLoggedIn, authStatus, navigate])


  return (
    loading ? <Spinner /> : <>{children}</>
  )
}

export default PrivateRoutes;