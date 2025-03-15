"use client"

import Link from "next/link"
import PostList from "./components/PostList"
import { useEffect, useState } from "react"

export default function Home() {

  const [credentials, setCredentials] = useState<any>(null)

  useEffect(() => {
    const credentials = localStorage.getItem("credentials")
    if (!credentials) {
      return
    }
    const parsedCredentials = JSON.parse(credentials)
    setCredentials(parsedCredentials)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    window.location.reload()
    console.log("Logged out")
  }

  return (
    <main className="container">
      <div className="header">
        <h1>Social Feed</h1>
        <div className="nav-buttons">
          {!credentials ? (
            <Link href="/login" className="button outline">
            Login
          </Link>
          ) : (
            <button type="button" className="button outline" onClick={handleLogout}>
              Logout
            </button>
          )}
          <Link href="/profile" className="button">
            Profile
          </Link>
        </div>
      </div>
      <PostList />
    </main>
  )
}
