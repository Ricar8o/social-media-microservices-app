"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function PostList() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
        const postsData = await postsResponse.json()

        setPosts(postsData)
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

  return (
    <div className="posts-container">
    </div>
  )
}

