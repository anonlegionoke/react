/* We need html-react-parser to display html components in complex scenarios */

import React, {useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
/* useParams helps you to grab the value we see in urls */

import appwriteService from "../appwrite/config"
import Button from "../components/Button"
import Container from "../components/container/Container"
import parse from "html-react-parser"
import {useSelector } from "react-redux"

function Post() {
  const [post, setPost] = useState(null)
  const {slug} = useParams() //defined in main.jsx
  const navigate = useNavigate()
  /* who should get the edit button?
  
  user and author*/
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false /* here we check the user who posted the post(post.userId)
  and the user requesting to edit(userData.id) are one and the same */


  /* Display the post or fetch the post by slug */
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post)
        }else {
          navigate("/")
        }
      })
    }
  }, [slug, navigate])

  /* designing a way to delete the post and files */

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) { /* display a status */
        appwriteService.deleteFile(post.featuredImage);
        navigate("/")
      }
    })
  }
  return post ? /* return only if there is a post */(
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={appwriteService.getFilePreview(post.featuredImage)} /* displaying a thumbnail of the post */ style = {{height:200}} alt={post.title} className='rounded-xl' />
          { isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" 
              onClick={deletePost}
              >Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)} {/* we need to use parse to display the html content as it is */}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post