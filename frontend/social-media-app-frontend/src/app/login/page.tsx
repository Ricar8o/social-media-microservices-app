"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { environment } from "../environments/environment"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const LOGIN_ENDPOINT = `${environment.USERS_API}/auth/login`
  const PROFILE_ENDPOINT = `${environment.USERS_API}/user/profile`

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      const response = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data = await response.json()
      localStorage.setItem("credentials", JSON.stringify(data))

      const profileResponse = await fetch(PROFILE_ENDPOINT, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      })
      if (!profileResponse.ok) {
        throw new Error("Profile fetch failed")
      }

      const profileData = await profileResponse.json()
      localStorage.setItem("userData", JSON.stringify(profileData))

      setMessage("Login successful!")
      setTimeout(() => {
        router.push("/profile")
      }, 1000)
    } catch (error) {
      setMessage("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <p>Enter your credentials to access your account</p>

        {message && <div className="message">{message}</div>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="username"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="button full-width" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="back-link">
          <Link href="/">Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

