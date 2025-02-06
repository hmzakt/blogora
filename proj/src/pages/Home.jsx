import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, Postcard } from "../components"

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts()
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents); // Assuming `documents` is a property
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error);
            });
    }, []);
    

    if (posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>
                               Shit! No post found... Be the first one to contribute
                            </h1>
                        </div>
                    </div>

                </Container>
            </div>
        )
    }

    return (
        <div className="w-full py-8 min-h-80">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {posts.map((post) => (
                <div key={post.$id} className="p-2">
                  <Postcard {...post} />
                </div>
              ))}
            </div>
          </Container>
        </div>
      );
      
}

export default Home
