import React from 'react'
import { useContext } from 'react'
import UserContext from '../context/UserContext'


function Profile() {
    const { user } = useContext(UserContext)
    
    if (!user) return <h1>No one is here</h1>
   
    return (
        <div>
            <h1>Profile: {user.username}</h1>
        </div>
  )
}

export default Profile