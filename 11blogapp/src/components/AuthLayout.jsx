import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Protected({ children, authentication = true }) {
  
  const authStatus = useSelector((state) => { state.auth.status })
  
  const navigate = useNavigate()

  /* As you can see there are multiples queries going back and forth here
  like useSelector, useNavigate, authentication etc.
  
  So we need a state management here (useState)
  
  Follow along*/

  const [loader, setLoader] = useState(true)

  useEffect(() => {
    /* if authentication required and the status is not authenticated, we need to return to login page */
   if (authentication && authStatus !== authentication) {
    navigate('/') 
   }
   /* else if authentication is not required and the status is authenticated, then we should not be
   on login/signup pages
   */
   else if (!authentication && authStatus !== authentication) {
     navigate('/login')
   }
    
    setLoader(false)

  }, [authStatus, authentication, navigate])

  return loader ? null : <>{children}</>
}

export default Protected