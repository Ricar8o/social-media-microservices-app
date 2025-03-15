"use client"

import { useEffect, useState } from "react"
import { environment } from "../environments/environment"
import moment from "moment"

interface IPost {
  id: number
  content: string
  createdAt: string
  author: {
    id: number
    username: string
    name: string
  }
  likes: number
  updatedAt: string
}

export default function PostList() {
  const [posts, setPosts] = useState<IPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [credentials, setCredentials] = useState<any>({})
  const FEED_URL = `${environment.POSTS_API}/feed`
  const POSTS_API = `${environment.POSTS_API}/posts`

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const credentials = localStorage.getItem("credentials")
        if (!credentials) {
          setPosts([])
          setIsLoading(false)
          return
        }
        const parsedCredentials = JSON.parse(credentials)
        setCredentials(parsedCredentials)
        const feedResponse = await fetch(FEED_URL, {
          headers: {
            Authorization: `Bearer ${parsedCredentials.token}`
          },
        })
        const feedData = await feedResponse.json()
        setPosts(feedData)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-card"></div>
        <div className="loading-card"></div>
        <div className="loading-card"></div>
      </div>
    )
  }

  const performLike = async (postId: number) => {
    try {
      const response = await fetch(`${POSTS_API}/${postId}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${credentials.token}`
        }
      })
      if (!response.ok) {
        throw new Error("Failed to like post")
      }
      const updatedPost = await fetch(`${POSTS_API}/${postId}`, {
        headers: {
          Authorization: `Bearer ${credentials.token}`
        }
      })
      const updatedPostData = await updatedPost.json()
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return updatedPostData
        }
        return post
      })
      setPosts(updatedPosts)
    } catch (error) {
      console.error("Error liking post:", error)
    }
  }


  const displayPosts = () => {
    if (posts.length === 0) {
      return <div>No posts to display</div>
    }

    return (
      <div className="posts-container">
        {posts.map((post) => (
          <div className="post-card" key={post.id}>
            <div className="post-header">
              <h3>{post.author.name}</h3>
              <span>{moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</span>
            </div>
            <div className="post-content">
              <p className="post-body">{post.content}</p>
            </div>
            <div className="post-footer">
              <button type="button" className="post-action" onClick={() => performLike(post.id)}>
                <span className="icon">♥</span>
                {post.likes > 0 && <span className="likes-count">{post.likes}</span>}
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="posts-container">
      {displayPosts()}
    </div>
  )
}

