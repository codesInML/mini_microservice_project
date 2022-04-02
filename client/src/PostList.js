import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

const PostList = () => {
    const [posts, setPosts] = useState({})

    const fetchPosts = async () => {
        try {
            const res = await axios.get("http://localhost:5050/posts")
            setPosts(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])
    
    const renderedPosts = Object.values(posts).map(post => {
        return (<div className="card" style={{width: '30%', marginBottom: '20px'}} key={post.id}>
            <div className='card-body'>
                <h3 className='card-title'>
                    {post.title}
                </h3>
                <CommentList comments={post.comments} />
                <CommentCreate postID={post.id} />
            </div>
        </div>)
    })

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}
    </div>
  )
}

export default PostList
