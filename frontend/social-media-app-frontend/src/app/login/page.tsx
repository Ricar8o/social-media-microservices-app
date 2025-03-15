"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")

    try {
      // Simulate API call
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1")
      const user = await response.json()

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(user))

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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

