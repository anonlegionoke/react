import React from 'react'
import {useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
 
function Github() {

    const data = useLoaderData()

    // const [data, setData] = React.useState([])
        
    // useEffect(() => {
    //     fetch('https://api.github.com/users/anonlegionoke')
    //         .then((res) => res.json())
    //         .then(data => {
    //             console.log(data)
    //             setData(data)
    //         })
    // }, [])

  return (
      <div className='text-center m-4 bg-gray-600 text-white text-3xl 
      font-bold p-4'>Github No of Repos: {data.public_repos}
        <img src={data.avatar_url} width= {150} alt="" />

      </div>
  ) 
}

export default Github


export const githubInfoLoader = async () => {
    const res = await fetch('https://api.github.com/users/anonlegionoke')
    return res.json()
}