import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {
  
  const authStatus = useSelector((state) => state.auth.status)

  /* useSelector is used to extract data (status of the state, here its's authetication state)
   from the redux store */
  
  const navigate = useNavigate()

  /* As you can see there are multiples queries going back and forth here
  like useSelector, useNavigate, authentication etc.
  
  So we need a useState here to setup a 'loading'
  
  Follow along*/

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    /* if authentication required and the status is not authenticated, we need to return to login page */
   if (authentication && authStatus !== authentication) {
    navigate('/login') 
   }
   /* else if authentication is not required and the status is also not authenticated, then we should not be
   on login/signup pages
   */
   else if (!authentication && authStatus !== authentication) {
     navigate('/')
   }
    
    setLoader(false)

  }, [authStatus, authentication, navigate])

  return loader ? null : <>{children}</>
}

export default Protected