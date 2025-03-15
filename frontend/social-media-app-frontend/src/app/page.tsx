import Link from "next/link"
import PostList from "./components/PostList"


export default function Home() {
  return (
    <main className="container">
      <div className="header">
        <h1>Social Feed</h1>
        <div className="nav-buttons">
          <Link href="/login" className="button outline">
            Login
          </Link>
          <Link href="/profile" className="button">
            Profile
          </Link>
        </div>
      </div>
      <PostList />
    </main>
  )
}
