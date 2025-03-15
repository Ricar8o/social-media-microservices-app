"use client"

import { useEffect, useState } from "react"
import { environment } from "../environments/environment"

export default function CreatePost({ onPostCreated }: Readonly<{ onPostCreated: (post: any) => void }>) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState("")
  const [credentials, setCredentials] = useState<any>({})
  const [isFormVisible, setIsFormVisible] = useState(false)

  const POSTS_API = `${environment.POSTS_API}/posts`

  useEffect(() => {
    const credentials = localStorage.getItem("credentials")
    if (!credentials) {
      return
    }
    const parsedCredentials = JSON.parse(credentials)
    setCredentials(parsedCredentials)
  }, [])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage("")

    try {
      const response = await fetch(POSTS_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${credentials.token}`,
        },
        body: JSON.stringify({
          content,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al crear el post")
      }

      const createdPost = await response.json()
      setMessage("¡Post creado exitosamente!")

      setContent("")

      onPostCreated(createdPost)

      setTimeout(() => {
        setIsFormVisible(false)
        setMessage("")
      }, 2000)
    } catch (error) {
      console.error("Error:", error)
      setMessage("Error al crear el post. Inténtalo de nuevo.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="create-post-container">
      {!isFormVisible ? (
        <button className="button full-width" onClick={() => setIsFormVisible(true)}>
          Create Post
        </button>
      ) : (
        <div className="create-post-form">
          <h2>Create Post</h2>

          {message && <div className="message">{message}</div>}

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Publish something..."
                rows={4}
                required
                maxLength={250}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="button outline"
                onClick={() => setIsFormVisible(false)}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button type="submit" className="button" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

