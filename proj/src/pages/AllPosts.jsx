import React, { useEffect, useState} from 'react'
import { Container, Postcard } from "../components/index"
import appwriteService from "../appwrite/config"

function AllPosts() {
    const [posts, setPosts] = useState([])
  
    useEffect(() => {
        // Move the API call inside useEffect
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])

    return (
        <div className="w-full py-8 bg-gray-50 min-h-screen">
  <Container>
    {/* Grid Layout for Post Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {posts.map((post) => (
        <div
          key={post.$id}
          className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Postcard {...post} />
        </div>
      ))}
    </div>

    {/* Loading State (Optional) */}
    {posts.length === 0 && (
      <div className="text-center py-8">
        <p className="text-gray-600">No posts found.</p>
      </div>
    )}
  </Container>
</div>
    )
}

export default AllPosts