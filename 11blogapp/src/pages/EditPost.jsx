/* To edit a post we need to know which post is that

we use useParams() to extract the slug from the url to understand which post

and we use the hook useEffect() to fetch that post by querying the appwrite */

import React from 'react'
import { useState } from 'react'
import {useParams, useNavigate} from "react-router-dom"
import service from "../appwrite/config"
import { useEffect } from 'react'
import Container from "../components/container/Container"
import PostForm from "../components/post-form/PostForm"

function EditPost() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post) /* We fetched the post by useEffect and updated its state */
        }else {
          navigate("/")
        }
      })
    }
  }, [slug, navigate])

  return (
    <div className='py-6'>
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  )
}

export default EditPost