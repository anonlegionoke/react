import React from 'react'
import appwriteService from "../appwrite/config"
import { useState } from 'react'
import { useEffect } from 'react'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"


function AllPosts() {
  const [posts, setPosts] = useState([]) /* Array because more than posts */

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents) /* post.documents coming from appwrite to point to the posts */
      }
    })
  }, [])
  
  if (posts.length === 0) {
    return (
      <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
          <h1>So much empty : No posts to show</h1>
        </div>
      </Container>
    </div>
    )
  }
  
  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">

          {posts.map((post) => (/* looping the posts to access posts */
            <div className="p-2 w-1/4" key={post.$id} /* need a unique id for each posts to identify
            which can be obtained from $id which is nothing but the slug itself */>
              <PostCard {...post} /* post is an object the way we defined (refer PostCard.jsx) so we need to spread
              the object */ />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts