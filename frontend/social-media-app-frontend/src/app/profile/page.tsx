"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface IUser {
  id: number
  name: string
  username: string
  biography: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("userData")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      setMessage("Please login to view your profile")
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userData")
    localStorage.removeItem("credentials")
    setMessage("You have been logged out successfully")
    setTimeout(() => {
      router.push("/login")
    }, 1000)
  }

  if (isLoading) {
    return <div className="container">Loading...</div>
  }

  if (!user) {
    return (
      <div className="container">
        <div className="message">{message}</div>
        <div className="back-link">
          <Link href="/login">Go to Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="avatar">{user.name.substring(0, 2).toUpperCase()}</div>
          <div>
            <h1>{user.name}</h1>
            <p>@{user.username}</p>
          </div>
        </div>

        <div className="profile-content">

          <div className="bio">
            <h3>Bio</h3>
            <p className="biography-description">{user.biography}</p>
          </div>
        </div>

        <div className="profile-footer">
          <button className="button outline" onClick={() => router.push("/")}>
            Back to Feed
          </button>
          <button className="button danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

