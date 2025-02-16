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
        <div className="w-full py-8 bg-[#cccccc] min-h-screen">
 
    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-[#cccccc]">
      {posts.map((post) => (
        <div
          key={post.$id}
          className=" bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Postcard {...post} />
        </div>
      ))}
    </div>

    
    {posts.length === 0 && (
      <div className="text-center py-8">
        <p className="text-gray-600">Hold on...</p>
      </div>
    )}

</div>
    )
}

export default AllPosts