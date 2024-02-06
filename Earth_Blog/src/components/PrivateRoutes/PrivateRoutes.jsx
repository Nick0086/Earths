import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function PrivateRoutes({ isLoggedIn, children }) {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const authStatus = useSelector((state) => state.auth.status);

  console.log("authStatus",authStatus)

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